import subprocess
import os

# GO TO KAFKA FOLDER (FOR WINDOWS)
os.chdir('C:/Kafka/kafka_2.12-3.1.0/bin/windows')

# INITIALIZE ZOOKEEPER
subprocess.check_call('zookeeper-server-stop.bat')    # Popen allows for multiple processes to run in parallel

# INITIALIZE APACHE KAFKA
subprocess.check_call('kafka-server-stop.bat')