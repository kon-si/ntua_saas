/* =====================
    	USERS 
======================*/

--USERS TABLE WILL BE EXECUTED ON ENERGYLIVE DATABASE
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