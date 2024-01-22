import csv
import json

def csv_to_json(csv_file, json_file):
    
    with open(csv_file, 'r', encoding='utf-8') as csv_input:
        csv_reader = csv.DictReader(csv_input)
        data = [row for row in csv_reader]

   
    with open(json_file, 'w', encoding='utf-8') as json_output:
        json.dump(data, json_output, indent=2)

if __name__ == "__main__":
    
    csv_to_json('archivo.csv', 'archivo.json')
