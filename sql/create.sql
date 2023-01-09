create schema training

create type training.enum_role as enum(
	 'admin', 'coach', 'coachee'
)


create table training.roles(
	id uuid primary key,
	name training.enum_role not null,
	createdAt timestamp default now() not null,
	updatedAt timestamp default now() not null
)

/*Tabela de usuários*/
create table training.users(
	id uuid primary key,
	name text not null,
	last_name text not null,
	password text not null,
	email text not null,
	phone text null,
	zipcode text null,
	city text null,
	state text null,
	address text null,
	country text not null,
	createdAt timestamp default now() not null,
	updatedAt timestamp default now() not null
)

/*Tabela pivo de regras e usuários*/
create table training.user_roles(
	id uuid primary key,
	user_id uuid not null,
	role_id uuid not null,
	createdAt timestamp default now() not null,
	updatedAt timestamp default now() not null,
	constraint roles_user_id_fk foreign key (user_id) references training.users(id),
	constraint roles_role_id_fk foreign key (role_id) references training.roles(id)
)

/*Tabela de blacklist de tokens ja utilizados*/
create table training.blacklist_token(
	id uuid primary key,
	user_id uuid not null,
	token text not null,
	createdAt timestamp default now() not null,
	updatedAt timestamp default now() not null,
	constraint toke_user_id_fk foreign key (user_id) references training.users(id)
)