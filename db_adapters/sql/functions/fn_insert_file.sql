-- language: postgresql
-- function to insert a file into the database
create or replace function fn_insert_file(
  p_folder_path varchar(255),
  p_name varchar(255),
  p_size_in_bytes bigint
)
returns int
as $$
declare
  v_id int;
  v_folder_id int;
begin
  -- call fn_parse_folderr_id to get folder_id
  v_folder_id := fn_parse_folder_id(p_folder_path);

  -- if folder_id is null then use root folder
  if v_folder_id is null then
    select id into v_folder_id from folders where name = '.';
  end if;

  -- file name cannot be null
  if p_name is null then
    raise exception 'file name cannot be null';
  end if;

  -- insert a file into the database
  insert into files (name, folder_id, size_in_bytes)
  values (p_name, v_folder_id, p_size_in_bytes)
  returning id into v_id;
  return v_id;
end;
$$ language plpgsql;