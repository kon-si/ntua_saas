/* =====================
	CREATE ENTITIES 
======================*/
--COUNTRIES TABLE WILL BE EXECUTED ON EVERY DATABASE
CREATE TABLE IF NOT EXISTS countries (
	country_id serial PRIMARY KEY,
	area_ref_name varchar (255),
	area_name varchar (50),
	country varchar (50),
	map_code varchar (50),
	area_type_code varchar (50)
);



--USERS TABLE WILL BE EXECUTED ON ENERGYLIVE DATABASE
CREATE TABLE IF NOT EXISTS users (
	user_id serial PRIMARY KEY,	
	firstName varchar (50),
	lastName varchar (50),
	username varchar (50),
	password varchar (255),
	email varchar (255),
	city varchar (255),
	address varchar (255),
	number NUMERIC,
	telephone NUMERIC
);


--ACTUAL_TOTAL WILL BE EXECUTED ON ENERGYLIVE_ACTUAL DATABASE
CREATE TABLE actual_total (
	ID serial PRIMARY KEY,
 	datetime TIMESTAMP,	
	resolution_code varchar (50),
	area_code varchar (255),
	area_type_code varchar (50),
	area_name varchar (50),
	map_code varchar (50),	
	total_load_value NUMERIC,
	update_time TIMESTAMP
);
--AGGREGATED_GENERATION TABLE WILL BE EXECUTED ON ENERGYLIVE_AGGREGATED DATABASE
CREATE TABLE aggregated_generation (
	ID serial PRIMARY KEY,
	datetime TIMESTAMP,	
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
--PHYSICAL_FLOWS WILL BE EXECUTED ON ENERGYLIVE_PHYSICAL DATABASE 
CREATE TABLE physical_flows(
	ID SERIAL PRIMARY KEY,
	datetime TIMESTAMP,	
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