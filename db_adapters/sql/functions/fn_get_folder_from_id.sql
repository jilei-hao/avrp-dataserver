-- language: postgresql
-- function to get folder string from a folder id

create or replace function fn_get_folder_from_id(
  p_folder_id int
)
returns varchar(255)
as $$
declare
  v_folder_name varchar(255);
  v_parent_id int;
  v_folder_path varchar(255);
begin
  -- validate folder_id
  if p_folder_id is null then
    raise exception 'folder_id cannot be null';
  end if;

  -- get folder_name and parent_id
  select name, parent_id into v_folder_name, v_parent_id from folders where id = p_folder_id;

  -- if parent_id is null then return folder_name
  if v_parent_id is null then
    return v_folder_name;
  end if;

  -- get folder_path
  v_folder_path := fn_get_folder_from_id(v_parent_id);

  -- return folder_path + '/' + folder_name
  return v_folder_path || '/' || v_folder_name;
end;
$$ language plpgsql;