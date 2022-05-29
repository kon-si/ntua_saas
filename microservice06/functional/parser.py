import sys

data = open(sys.argv[1], "r")
lines = data.readlines()
date_string = lines[1].split('\t')[0]
print(date_string[:7])
sys.stdout.flush()