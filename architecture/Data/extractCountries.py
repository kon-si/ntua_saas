# icons = open("country2flag.csv", "r")
# lines = icons.readlines()
# icons_dict = {}
# for line in lines[1:]:
#     l = line.split(",")
#     icons_dict[l[0]] = l[1]

# print(icons_dict['Albania'])
# print(icons_dict)

data = open("countries_data.csv", "r")

lines = data.readlines()

dict = '{\n'

for line in lines[1:-1]:
    l = line.split(";")
    # dict += '\t"' + l[3] + '": "' + icons_dict[l[2]].strip() + ' ' + l[2] + '",\n'
    dict += '\t"' + l[3] + '": "' + l[2] + '",\n'

l = lines[-1].split(";")
# dict += '\t"' + l[3] + '": "' + icons_dict[l[2]].strip() + ' ' + l[2] + '"\n'
dict += '\t"' + l[3] + '": "' + l[2] + '"\n'

dict += '}'

jsonFile = open("countries_list.json", "w")
jsonFile.write(dict)
jsonFile.close()