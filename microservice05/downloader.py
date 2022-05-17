import os
import psycopg2
from kafka import KafkaProducer

topic = 'total'
bootstrap_servers = 'localhost:9092'
producer = KafkaProducer(bootstrap_servers=bootstrap_servers)

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
    input("Press Enter to Import " + file_name)

    data = open(file_name, "r")
    lines = data.readlines()
    date_string = lines[1].split('\t')[0]
    date_parsed = date_string[:10]
    year_parsed = date_string[:4]
    month_parsed = date_string[5:7]

    start_date = year_parsed + "-" + month_parsed + "-01"
    if month_parsed == "01" or  month_parsed == "03" or  month_parsed == "05" or  month_parsed == "07" or  month_parsed == "08" or  month_parsed == "10" or  month_parsed == "12": 
        end_date = year_parsed + "-" + month_parsed + "-31"

    if month_parsed == "04" or  month_parsed == "06" or  month_parsed == "09" or  month_parsed == "11":
        end_date = year_parsed + "-" + month_parsed + "-30"

    if month_parsed == "02": 
        end_date = year_parsed + "-" + month_parsed + "-28"

    sql = "DELETE FROM actual_total WHERE date_time >= %s AND date_time <= %s"
    cursor.execute(sql, (start_date, end_date))
    conn.commit()

    print("Importing", file_name)
    sql = "COPY actual_total(date_time,resolution_code,area_code,area_type_code,area_name,map_code,total_load_value,update_time) FROM '{}' DELIMITER '\t' CSV HEADER;".format(file_name)
    cursor.execute(sql)
    conn.commit()

    msg = "API call url"
    future = producer.send(topic, msg.encode('utf-8'))

conn.close()