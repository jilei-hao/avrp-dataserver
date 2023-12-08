-- language: postgresql
-- function to insert a file into the database
create or replace function fn_insert_file(
  p_name varchar(255),
  p_folder_id int,
  p_size_in_byte bigint
)
returns int
as $$
declare
  v_id int;
begin
  -- validate folder_id
  if p_folder_id is not null then
    if not exists(select 1 from folders where id = p_folder_id) then
      raise exception 'folder_id % does not exist', p_folder_id;
    end if;
  end if;

  -- if folder_id is null then use root folder
  if p_folder_id is null then
    select id into p_folder_id from folders where name = 'root';
  end if;

  -- file name cannot be null
  if p_name is null then
    raise exception 'file name cannot be null';
  end if;

  -- insert a file into the database
  insert into files (name, folder_id, size_in_byte)
  values (p_name, p_folder_id, p_size_in_byte)
  returning id into v_id;
  return v_id;
end;
$$ language plpgsql;