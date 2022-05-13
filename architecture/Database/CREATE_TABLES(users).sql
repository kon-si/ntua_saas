/* =====================
    	USERS 
======================*/

--USERS TABLE WILL BE EXECUTED ON ENERGYLIVE DATABASE
CREATE TABLE IF NOT EXISTS users (
	user_id serial PRIMARY KEY,	
	first_name varchar (50),
	last_name varchar (50),
	username varchar (50),
	password_hash varchar (255),
	email varchar (255),
	country varchar (255),
	subcription_plan varchar (50),
	renewal_date TIMESTAMP (50),
	auth_token varchar(255),
	telephone NUMERIC
);