import os
import psycopg2

def getListOfFiles(dirName):
    # create a list of file and sub directories 
    # names in the given directory 
    listOfFile = os.listdir(dirName)
    allFiles = list()
    # Iterate over all the entries
    for entry in listOfFile:
        # Create full path
        fullPath = os.path.join(dirName, entry)
        # If entry is a directory then get the list of files in this directory 
        if os.path.isdir(fullPath):
            allFiles = allFiles + getListOfFiles(fullPath)
        else:
            allFiles.append(fullPath)
                
    return allFiles

for file_name in sorted(getListOfFiles("/home/konsi/Desktop/SaaS/saas2022-20/microservice05/Data")):
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

    print(end_date)
    print(start_date)

    conn = psycopg2.connect(database = "energyLive_total",
                            user = "postgres", 
                            password = "postgres",
                            host = "127.0.0.1",
                            port = "5432")
    cursor = conn.cursor()

    sql = "DELETE FROM actual_total WHERE date_time >= %s AND date_time <= %s"
    cursor.execute(sql, (start_date, end_date))

    conn.commit()

conn.close()