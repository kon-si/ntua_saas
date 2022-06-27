import subprocess
import os

##############################################
###   DOWNLOAD THE DEPENDENCIES
##

# Path of project folder
dir_path = os.path.dirname(os.path.realpath(__file__))

#install python dependencies
subprocess.check_call('pip install -r requirements.txt', shell=True)

print("Dependencies downloaded successfully........")


##############################################
###   CREATE THE DATABASE
##

import psycopg2

#establishing the connection
conn = psycopg2.connect(
   database="postgres",
   user='postgres',
   password='postgres',
   host='localhost',
   port= '5432'
)
conn.autocommit = True

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

# CREATE DATABASE FOR ACTUAL TOTAL
fd = open(os.path.join(dir_path, "Database/CREATE_DATABASE(total).sql"), 'r')
sqlFile = fd.read()
fd.close()

#Creating a database
cursor.execute(sqlFile)
print("Total database created successfully........")

# CREATE DATABASE FOR PHYSICAL FLOWS
fd = open(os.path.join(dir_path, "Database/CREATE_DATABASE(flows).sql"), 'r')
sqlFile = fd.read()
fd.close()

#Creating a database
cursor.execute(sqlFile)
print("Flows database created successfully........")

# CREATE DATABASE FOR AGGREGATED GENEARATION
fd = open(os.path.join(dir_path, "Database/CREATE_DATABASE(generation).sql"), 'r')
sqlFile = fd.read()
fd.close()

#Creating a database
cursor.execute(sqlFile)
print("Generation database created successfully........")

# CREATE DATABASE FOR ACTUAL TOTAL
fd = open(os.path.join(dir_path, "Database/CREATE_DATABASE(users).sql"), 'r')
sqlFile = fd.read()
fd.close()

#Creating a database
cursor.execute(sqlFile)
print("Users database created successfully........")

#Closing the connection
conn.close()


##############################################
###   CREATE THE TABLES & VIEWS
##

conn = psycopg2.connect(
   database="energyLive_total",
   user='postgres',
   password='postgres',
   host='localhost',
   port= '5432'
)
conn.autocommit = True

cursor = conn.cursor()

## CREATE THE TABLES FOR ACTUAL TOTAL CONSUMPTION
fd = open(os.path.join(dir_path, "Database/CREATE_TABLES(total).sql"), 'r')
sqlFile = fd.read()
fd.close()

cursor.execute(sqlFile)
print("Total tables created successfully........")

conn.close()


conn = psycopg2.connect(
   database="energyLive_flows",
   user='postgres',
   password='postgres',
   host='localhost',
   port= '5432'
)
conn.autocommit = True

cursor = conn.cursor()

## CREATE THE TABLES FOR PHYSICAL FLOWS
fd = open(os.path.join(dir_path, "Database/CREATE_TABLES(flows).sql"), 'r')
sqlFile = fd.read()
fd.close()

cursor.execute(sqlFile)
print("Flows tables created successfully........")

conn.close()


conn = psycopg2.connect(
   database="energyLive_generation",
   user='postgres',
   password='postgres',
   host='localhost',
   port= '5432'
)
conn.autocommit = True

cursor = conn.cursor()

## CREATE THE TABLES FOR AGGREGATED GENERATION
fd = open(os.path.join(dir_path, "Database/CREATE_TABLES(generation).sql"), 'r')
sqlFile = fd.read()
fd.close()

cursor.execute(sqlFile)
print("Generation tables created successfully........")

conn.close()


conn = psycopg2.connect(
   database="energyLive_users",
   user='postgres',
   password='postgres',
   host='localhost',
   port= '5432'
)
conn.autocommit = True

cursor = conn.cursor()

## CREATE THE TABLES FOR ACTUAL TOTAL CONSUMPTION
fd = open(os.path.join(dir_path, "Database/CREATE_TABLES(users).sql"), 'r')
sqlFile = fd.read()
fd.close()

cursor.execute(sqlFile)
print("Users tables created successfully........")

conn.close()
