-- language: plpgsql
-- function to check if a folder exists given a path

create or replace function fn_is_folder_exists(
  p_folder_path varchar(255)
)
returns boolean
as $$
declare
  v_folder_id int;
begin
  -- call fn_parse_folderr_id to get folder_id
  v_folder_id := fn_parse_folder_id(p_folder_path);

  -- if folder_id is null then use root folder
  return v_folder_id is not null;
end;
$$ language plpgsql;