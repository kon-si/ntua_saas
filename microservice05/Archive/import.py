import psycopg2

conn = psycopg2.connect(database="energyLive_total",
                        user='postgres', 
                        password='postgres',
                        host='127.0.0.1',
                        port='5432')
cursor = conn.cursor()

file_name = ""
print("Importing", file_name)
sql = "COPY actual_total(date_time,resolution_code,area_code,area_type_code,area_name,map_code,total_load_value,update_time) FROM '%s' DELIMITER '\t' CSV HEADER;"
cursor.execute(sql % file_name)
conn.commit()
conn.close()