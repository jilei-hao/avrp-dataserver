-- language plpgsql
-- function to create a folder recursivly given a path

create or replace function fn_create_folder(
  p_folder_path varchar(255)
)
returns int
as $$
declare
  v_folder_id int;
  v_parent_id int;
  v_folder_name varchar(255);
  v_folder_path varchar(255);
  v_folder_path_array varchar(255)[];
  v_folder_path_array_length int;
  v_folder_path_array_index int;
begin
  -- validate folder_path
  if p_folder_path is null then
    raise exception 'folder_path cannot be null';
  end if;

  -- if folder_path not starting with ./ then prepend ./ to folder_path
  if not p_folder_path ~ '^./' then
    -- if folder_path started with / then remove it
    if p_folder_path ~ '^/' then
      p_folder_path := substring(p_folder_path from 2);
    end if;

    p_folder_path := './' || p_folder_path;
  end if;

  -- split folder_path into array
  v_folder_path_array := string_to_array(p_folder_path, '/');
  v_folder_path_array_length := array_length(v_folder_path_array, 1);

  -- loop through folder_path_array
  v_folder_path_array_index := 1;
  v_folder_id := null;
  while v_folder_path_array_index <= v_folder_path_array_length loop
    v_folder_name := v_folder_path_array[v_folder_path_array_index];
    -- continue iteration if v_folder_name is .
    if v_folder_name = '.' then
      v_folder_path_array_index := v_folder_path_array_index + 1;
      continue;
    end if;

    if v_folder_name is not null then
      if v_folder_id is null then
        -- if folder_id is null then use root folder
        select id into v_folder_id from folders where name = '.';
      end if;

      v_parent_id := v_folder_id;

      -- get folder_id
      select id into v_folder_id from folders where name = v_folder_name and parent_id = v_parent_id;
      if v_folder_id is null then
        -- create folder
        insert into folders(name, parent_id, created_at, last_modified_at)
        values(v_folder_name, v_parent_id, now(), now())
        returning id into v_folder_id;
      end if;
    end if;

    v_folder_path_array_index := v_folder_path_array_index + 1;
  end loop;

  return v_folder_id;
end;
$$ language plpgsql;