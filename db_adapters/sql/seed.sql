-- language postgresql
-- create seed data for users table
insert into users (username, token) values ('admin', 'admin');
insert into users (username, token) values ('gateway', 'qgc46Qjn12zg22R5ajIS9VdVJwM+AawWbarpSEeDDfc=');
insert into folders (name, parent_id) values ('.', null);

-- backout sql
-- delete from users where username = 'admin';
-- delete from users where username = 'gateway';
-- delete from folders where name = 'root';