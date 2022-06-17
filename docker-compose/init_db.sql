CREATE DATABASE "energyLive_users"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

\connect energyLive_users

CREATE TABLE IF NOT EXISTS users (
	user_id serial PRIMARY KEY,	
	first_name varchar (50),
	last_name varchar (50),
	username varchar (50) UNIQUE NOT NULL,
	email varchar (255) UNIQUE NOT NULL,
	password_hash varchar (255) NOT NULL,
	telephone varchar (20),
	address varchar (100),
	expiration_date TIMESTAMP,
	auth_token text
);

CREATE DATABASE "energyLive_total"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

\connect energyLive_total

CREATE TABLE IF NOT EXISTS countries (
	country_id serial PRIMARY KEY,
	area_ref_name varchar (255),
	area_name varchar (50),
	country varchar (50),
	map_code varchar (50),
	area_type_code varchar (50)
);

CREATE TABLE IF NOT EXISTS actual_total (
	total_id serial PRIMARY KEY,
 	date_time TIMESTAMP,	
	resolution_code varchar (50),
	area_code varchar (255),
	area_type_code varchar (50),
	area_name varchar (50),
	map_code varchar (50),	
	total_load_value NUMERIC,
	update_time TIMESTAMP
);

CREATE DATABASE "energyLive_flows"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

\connect energyLive_flows

CREATE TABLE IF NOT EXISTS countries (
	country_id serial PRIMARY KEY,
	area_ref_name varchar (255),
	area_name varchar (50),
	country varchar (50),
	map_code varchar (50),
	area_type_code varchar (50)
);

CREATE TABLE IF NOT EXISTS physical_flows(
	flow_id SERIAL PRIMARY KEY,
	date_time TIMESTAMP,	
	resolution_code varchar (50),
	out_area_code varchar (255),	
	out_area_type_code varchar (50),
	out_area_name varchar (50),	
	out_map_code varchar (50),
	in_area_code varchar (50),	
	in_area_type_code varchar (50),
	in_area_name varchar (50),
	in_map_code varchar (50),	
	flow_value NUMERIC,
	update_time TIMESTAMP
);

CREATE DATABASE "energyLive_generation"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

\connect energyLive_generation

CREATE TABLE IF NOT EXISTS countries (
	country_id serial PRIMARY KEY,
	area_ref_name varchar (255),
	area_name varchar (50),
	country varchar (50),
	map_code varchar (50),
	area_type_code varchar (50)
);

CREATE TABLE IF NOT EXISTS aggregated_generation (
	generation_id serial PRIMARY KEY,
	date_time TIMESTAMP,	
	resolution_code varchar (50),
	area_code varchar (255),
	area_type_code varchar (50),
	area_name varchar (50),
	map_code varchar (50),		
	production_type	varchar (50),
	actual_generation_output NUMERIC,
	actual_consumption NUMERIC,
	update_time TIMESTAMP
);