create type user_role as enum('viewer','analyst','admin');


create table if not exists users(
    id serial primary key,
    username varchar(100) not null,
    email varchar(100) unique not null,
    hashed_password varchar(100) not null,
    role user_role default 'viewer',
    created_at  timestamp default now()
);