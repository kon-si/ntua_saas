import os
import psycopg2
from kafka import KafkaProducer
import configparser

# PARAMETERS
config_path = './config.ini'

configParser = configparser.ConfigParser();
configParser.read(config_path)
db_params = configParser["postgresql"]
kafka_params = configParser["kafka"]

# INITIALIZE A KAFKA PRODUCER
producer = KafkaProducer(bootstrap_servers=kafka_params["servers"]);

# PATH OF PROJECT
dir_path = os.path.dirname(os.path.realpath(__file__))

# NEW FILES TO BE IMPORTED
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

# DB CONNECION
def db_connect():
    conn = psycopg2.connect(database=db_params["database"],
                            user=db_params["user"], 
                            password=db_params["password"],
                            host=db_params["host"],
                            port=db_params["port"])
    return conn, conn.cursor()

def end_date_calc(month_parsed, year_parsed):
    if (month_parsed == "12") :
        end_date = str(int(year_parsed)+1) + "-"
    else :
        end_date = year_parsed + "-"

    if (int(month_parsed) < 9):
        end_date += "0"

    end_date += str(int(month_parsed)+1) + "-01"

    return end_date

def import_new_file(file_name):
    # GET FIRST ENTRY OF SHEET
    data = open(file_name, "r")
    lines = data.readlines()
    date_string = lines[1].split('\t')[0]
    date_parsed = date_string[:10]
    year_parsed = date_string[:4]
    month_parsed = date_string[5:7]

    # CALCULATE START, END DATE OF TABLE TO DELETE
    start_date = year_parsed + "-" + month_parsed + "-01"
    end_date = end_date_calc(month_parsed, year_parsed)

    print("Deleting ... ", file_name)
    print("From : ", start_date, " To : ", end_date)
    sql = "DELETE FROM aggregated_generation WHERE date_time >= %s AND date_time <= %s"
    cursor.execute(sql, (start_date, end_date))
    conn.commit()

    print("Importing ...", file_name)
    sql = "COPY aggregated_generation(date_time,resolution_code,area_code,area_type_code,area_name,map_code,production_type,actual_generation_output,actual_consumption,update_time) FROM '{}' DELIMITER '\t' CSV HEADER;".format(file_name)
    cursor.execute(sql)
    conn.commit()

    return (start_date, end_date)

# BUSINESS LOGIC
# 1) Connect to DB
conn, cursor = db_connect()
# 2) Import each new dataset to the DB (press Enter to import each sheet)
for file_name in sorted(list_dir_files(os.path.join(dir_path, "Data"))):
    input("Press Enter to Import " + file_name)

    (startDate, endDate) = import_new_file(file_name)

    # 3) Send message to kafka for each DB update
    print("KAFKA msg sent !")
    # msg = "API call url"
    msg = '{ "StartDate" : "' +startDate+ '", "EndDate" : "' +endDate+ '"}'
    # msg = json.dumps(msg_string)
    future = producer.send(kafka_params["topic"], msg.encode('utf-8'))

conn.close()