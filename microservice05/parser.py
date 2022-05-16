from datetime import datetime

file_path = "C:/Users/Public/TEMP/2022_01_22_00_ActualTotalLoad6.1.A.csv"

data = open(file_path, "r")
lines = data.readlines()

date_string = lines[1].split('\t')[0]
date_parsed = date_string[0:10]
month_parsed = date_string[5:7]

print(date_parsed)
# date_parsed = datetime.strptime(date_string, '%Y-%m-%dT %H::%M::%S.%f')

import psycopg2

conn = psycopg2.connect(database="energyLive_total",
                        user='postgres', 
                        password='postgres',
                        host='127.0.0.1',
                        port='5432')


conn.autocommit = True
cursor = conn.cursor()

sql = '''
    DELETE FROM actual_total WHERE date_time <= %s AND date_time >= %s
'''

cursor.execute(sql, ('2022-1-15', '2022-'+month_parsed+'-01'))

conn.commit()
conn.close()
