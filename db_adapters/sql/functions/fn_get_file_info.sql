-- language: postgresql
-- function to get file info

create or replace function fn_get_file_info(
  p_file_id int
)
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
  -- validate file_id
  if p_file_id is null then
    raise exception 'file_id cannot be null';
  end if;

  -- get file info
  return query
    select
      f.id,
      f.name,
      fn_get_folder_from_id(f.folder_id),
      f.size_in_bytes,
      f.created_at,
      f.last_modified_at
    from files f
    where f.id = p_file_id;
end;
$$ language plpgsql;