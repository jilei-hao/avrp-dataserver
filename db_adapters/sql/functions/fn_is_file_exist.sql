-- language: postgresql
-- function to check if a file exists
create or replace function fn_is_file_exists(
  p_folder_path varchar(255),
  p_name varchar(255)
)
returns boolean
as $$
declare
  v_folder_id int;
  v_count int;
begin
  -- call fn_parse_folderr_id to get folder_id
  v_folder_id := fn_parse_folder_id(p_folder_path);

  -- if folder_id is null then use root folder
  if v_folder_id is null then
    select id into v_folder_id from folders where name = 'root';
  end if;

  -- file name cannot be null
  if p_name is null then
    raise exception 'file name cannot be null';
  end if;

  -- check if file exists
  select count(*) into v_count from files where name = p_name and folder_id = v_folder_id;
  return v_count > 0;
end;
$$ language plpgsql;