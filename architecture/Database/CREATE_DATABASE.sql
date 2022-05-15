--THESE WILL BE EXECUTED TO CREATE DATABASE

/* =====================
    PHYSICAL FLOWS 
======================*/

CREATE DATABASE "energyLive_flows"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
	
/* =====================
    	ACTUAL TOTAL 
======================*/

CREATE DATABASE "energyLive_total"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
	
/* =====================
    	AGGREGATED GENERATION 
======================*/

CREATE DATABASE "energyLive_generation"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

/* =====================
    	USERS 
======================*/

CREATE DATABASE "energyLive_users"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;