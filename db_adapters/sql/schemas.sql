-- language postgresql
-- table for storing recursive folder
create table if not exists folders (
    id serial primary key,
    name varchar(255) not null,
    created_at timestamp not null default now(),
    last_modified_at timestamp not null default now(),
    parent_id int references folders(id) on delete cascade
);

-- table for storing file metadata
-- each file is stored in a folder
create table if not exists files (
    id serial primary key,
    name varchar(255) not null,
    folder_id int references folders(id) on delete cascade,
    size_in_bytes bigint not null,
    created_at timestamp not null default now(),
    last_modified_at timestamp not null default now()
);

-- table for storing user
create table if not exists users (
    id serial primary key,
    username varchar(255) not null,
    token varchar(255) not null,
    created_at timestamp not null default now(),
    last_modified_at timestamp not null default now()
);


-- backout sql
-- drop table files;
-- drop table folders;
-- drop table users;