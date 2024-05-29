#! /bin/bash

# This script is used to reset the database to a clean state.
psql -p 7071 -U jileihao -c "DROP DATABASE IF EXISTS \"data-server-db\";"
psql -p 7071 -U jileihao -c "CREATE DATABASE \"data-server-db\";"

# Apply the schema to the database
psql -p 7071 -U jileihao -d data-server-db -f db_adapters/sql/schemas.sql

# Apply seed data to the database
psql -p 7071 -U jileihao -d data-server-db -f db_adapters/sql/seed.sql

# Apply functions in the function folder
for f in db_adapters/sql/functions/*.sql; do
  psql -p 7071 -U jileihao -d data-server-db -f $f
done

# Apply create user
psql -p 7071 -U jileihao -d data-server-db -f db_adapters/sql/create_user.sql

# Clean up the file storage
rm -rf testing/data_root_dir/*