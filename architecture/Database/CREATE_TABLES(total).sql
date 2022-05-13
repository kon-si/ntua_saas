/* =====================
    	ACTUAL TOTAL 
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