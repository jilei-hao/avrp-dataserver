-- language postgresql
-- create seed data for users table
insert into users (username, token) values ('admin', 'admin');
insert into users (username, token) values ('gateway', 'qgc46Qjn12zg22R5ajIS9VdVJwM+AawWbarpSEeDDfc=');

-- backout sql
-- delete from users where username = 'admin';
-- delete from users where username = 'gateway';