import os
import zipfile
import csv
from confluent_kafka import Producer, Consumer, KafkaException
from google.cloud import storage
import configparser
import socket
import sys
 
HOST = '' 
PORT = 9110 
 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
try:
    s.bind((HOST, PORT))
    
except socket.error as msg:
    print('Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1])
    sys.exit()
	
print('Socket bind complete')
s.listen()

# PARAMETERS
config_path = './config.ini'
configParser = configparser.ConfigParser()
configParser.read(config_path)
kafka_params = configParser["kafka"]

# INITIALIZE A KAFKA PRODUCER
producer_conf = { 
    'bootstrap.servers' : kafka_params["servers"], 
    'security.protocol' : 'SASL_SSL',
    'sasl.mechanism' : 'PLAIN',
    'sasl.username' : kafka_params["username"],
    'sasl.password' : kafka_params["password"]
}
producer = Producer(producer_conf)

# INITIALIZE A KAFKA CONSUMER
consumer_conf = {
    'bootstrap.servers' : kafka_params["servers"],
    'group.id' : kafka_params["consumer_groupid"],
    'security.protocol' : 'SASL_SSL',
    'sasl.mechanism' : 'PLAIN',
    'sasl.username' : kafka_params["username"],
    'sasl.password' : kafka_params["password"],
}
consumer = Consumer(consumer_conf)

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

csv_headers = ['date_time', 'resolution_code', 'area_code', 'area_type_code', 'area_name', 'map_code', 'production_type', 'actual_generation_output', 'actual_consumption', 'update_time']

def parse_file(file_path):
    reader = csv.reader(open(file_path), delimiter='\t')
    filtered = filter(lambda p: 'CTY' == p[3], reader)
    new_path_file = os.path.join(dir_path, "import_files", os.path.basename(file_path))
    new_writer = csv.writer(open(new_path_file, 'w', newline=''), delimiter='\t')
    new_writer.writerow(csv_headers)
    new_writer.writerows(filtered)
    print ("Parsed " + os.path.basename(file_path))

# Kafka consumer
files_list = sorted(list_dir_files(os.path.join(dir_path, "parse_files")))
consumer.subscribe([kafka_params["consumer_topic"]])

while True:
    # Poll for new message
    msg = consumer.poll(timeout = 1.0)

    if msg is None: continue

    if msg.error():
        raise KafkaException(msg.error())

    else:
        # Commit message offset
        consumer.commit(asynchronous=False)
        
        # Parse file
        file_path = files_list.pop(0)
        file_name = os.path.basename(file_path)
        print("Parsing " + file_name)
        parse_file(file_path)

        # Compress file
        new_file_path = os.path.join(dir_path, "import_files", file_name)
        file_name_zip = file_name.replace(file_name[len(file_name) - 3:], "zip")
        with zipfile.ZipFile('./import_files/' + file_name_zip, 'w', zipfile.ZIP_DEFLATED) as zip:
            zip.write(new_file_path, file_name) # zip.write(actual file path, path inside zip file

        # Upload file to bucket
        client = storage.Client.from_service_account_json('./saas-2022-bc1a910f9c03.json')
        bucket = client.get_bucket(kafka_params["bucket_name"], timeout=300.0)
        blob = bucket.blob(file_name_zip)

        for attempt in range(10):
            try:
                print("Uploading " + file_name_zip + " to " + kafka_params["bucket_name"])
                blob.upload_from_filename('./import_files/' + file_name_zip)
            except:
                print("The write operation timed out. Retrying...")
            else:
                print("Uploaded " + file_name_zip + " to " + kafka_params["bucket_name"])
                # os.remove('./parse_files/' + file_name) 
                os.remove('./import_files/' + file_name) 
                os.remove('./import_files/' + file_name_zip) 
                print("Deleted " + file_name_zip + ", " + file_name)
                break
        else:
            print("The write operation timed out. Retries exceeded.")

        # Send message to kafka for each file parse
        producer.produce(kafka_params["producer_topic"], key = '1', value = file_name_zip.encode('utf-8'))
        producer.flush()
        print("Message: " + file_name_zip + " sent to topic " + kafka_params["producer_topic"])
        
        # Check if file list is empty
        if (len(files_list) == 0):
            consumer.close()
            print("All files parsed")
            break