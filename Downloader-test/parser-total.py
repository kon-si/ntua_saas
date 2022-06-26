import os
import csv
from kafka import KafkaProducer

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

def parse_file(file_path):
    reader = csv.reader(open(file_path), delimiter='\t')
    filtered = filter(lambda p: 'CTY' == p[3], reader)
    new_path_file = os.path.join(dir_path, "Output-total", os.path.basename(file_path))
    csv.writer(open(new_path_file, 'w'), delimiter='\t').writerows(filtered)
    print ("_______________________________________________")
    print (" Find the new file in ", new_path_file)


#ATL
for file_name in sorted(list_dir_files(os.path.join(dir_path, "Data-total"))):
    input("Press Enter to Import " + file_name)

    parse_file(file_name)
