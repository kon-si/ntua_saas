import os
import psycopg2

def list_dir_files(dirName):
    list_of_files = os.listdir(dirName)
    all_files = list() 
    for entry in list_of_files:
        full_path = os.path.join(dirName, entry)
        if os.path.isdir(full_path):
            all_files = all_files + list_dir_files(full_path)
        else:
            all_files.append(full_path)        
    return all_files

conn = psycopg2.connect(database="energyLive_total",
                        user='postgres', 
                        password='postgres',
                        host='127.0.0.1',
                        port='5432')
cursor = conn.cursor()

for file_name in sorted(list_dir_files("/home/konsi/Desktop/SaaS/saas2022-20/microservice05/Data")):
    input()
    print("Importing", file_name)
    sql = "COPY actual_total(date_time,resolution_code,area_code,area_type_code,area_name,map_code,total_load_value,update_time) FROM '%s' DELIMITER '\t' CSV HEADER;"
    cursor.execute(sql % file_name)
    conn.commit()

conn.close()