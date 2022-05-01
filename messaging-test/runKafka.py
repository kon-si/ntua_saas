import subprocess
import os
import time

# GO TO KAFKA FOLDER (FOR WINDOWS)
os.chdir('C:/Kafka/kafka_2.12-3.1.0/bin/windows')

# INITIALIZE ZOOKEEPER
subprocess.Popen('zookeeper-server-start.bat ../../config/zookeeper.properties')    # Popen allows for multiple processes to run in parallel

time.sleep(4) # to ensure zookeeper has started correctly

# INITIALIZE APACHE KAFKA
subprocess.check_call('kafka-server-start.bat ../../config/server.properties')