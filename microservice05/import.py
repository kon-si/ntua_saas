import psycopg2

conn = psycopg2.connect(database="energyLive_total",
                        user='postgres', 
                        password='postgres',
                        host='127.0.0.1',
                        port='5432')

conn.autocommit = True
cursor = conn.cursor()

sql = '''COPY actual_total(date_time,resolution_code,area_code,area_type_code,area_name,map_code,total_load_value,update_time)
FROM 'C:/Users/Public/TEMP/2022_01_22_00_ActualTotalLoad6.1.A.csv'
DELIMITER '\t'
CSV HEADER;'''

cursor.execute(sql)

conn.commit()
conn.close()