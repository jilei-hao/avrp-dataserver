#! /bin/bash

# This script is used to reset the database to a clean state.
psql -p 7071 -U jileihao -c "DROP DATABASE IF EXISTS \"data-server-db\";"
psql -p 7071 -U jileihao -c "CREATE DATABASE \"data-server-db\";"

# Apply the schema to the database
psql -p 7071 -U jileihao -d data-server-db -f sql/schemas.sql

# Apply seed data to the database
psql -p 7071 -U jileihao -d data-server-db -f sql/seed.sql
