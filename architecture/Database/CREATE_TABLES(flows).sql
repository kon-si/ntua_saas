/* =====================
    PHYSICAL FLOWS 
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