-- language: postgresql
-- function list all files with folder info

create or replace function fn_list_folder_files()
returns table (
  id int,
  name varchar(255),
  folder_path varchar(255),
  size_in_bytes bigint,
  created_at timestamp,
  last_modified_at timestamp
)
as $$
begin
  -- get file info
  return query
    select
      f.id,
      f.name,
      fn_get_folder_from_id(f.folder_id),
      f.size_in_bytes,
      f.created_at,
      f.last_modified_at
    from files f;
end;
$$ language plpgsql;