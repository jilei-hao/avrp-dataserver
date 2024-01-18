-- language plpgsql
-- get file id from folder and filename
-- returns 0 if file not found

create or replace function fn_get_file_id(
  p_folder_path varchar(255),
  p_file_name varchar(255)
)
returns int
as $$
declare
  v_folder_id int;
  v_file_id int;
begin
  -- validate folder_path
  if p_folder_path is null then
    raise exception 'folder_path cannot be null';
  end if;

  -- validate file_name
  if p_file_name is null then
    raise exception 'file_name cannot be null';
  end if;

  -- get folder_id
  -- populate v_folder_id by calling fn_get_folder_id_from_path
  v_folder_id := fn_get_folder_id_from_path(p_folder_path);
  if v_folder_id is null then
    return 0;
  end if;

  -- get file_id
  select id into v_file_id from files where folder_id = v_folder_id and name = p_file_name;
  if v_file_id is null then
    return 0;
  end if;

  return v_file_id;
end;
$$ language plpgsql;