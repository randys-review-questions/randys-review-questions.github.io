'''
update_db_formats.py 

This script updates all database files to reflect that 
of its equivalent template.

Example Usage:
    python update_db_formats.py responses.csv
The above line would take all responses.csv files found 
in the website and update the columns to match that of 
template/responses.csv. Data will be removed along with 
removed columns. New columns will contain empty data.
'''

import os
import sys 

import numpy as np 
import pandas as pd 

# Get all paths to files containing inputted filename 
def get_all_paths(filename):
    result = list()
    for path, dirnames, filenames in os.walk('../'):
        if 'templates' not in path and filename in filenames:
            result.append(path + '/' + filename)
    return result 

# Return dictionary containing elements of inputted list as keys 
def populate_dict(keys):
    result = dict()
    for key in keys:
        result[key] = None
    return result

def main():
    dbName = sys.argv[1]
    columns = pd.read_csv('../templates/' + dbName).columns 
    
    paths = get_all_paths(dbName)
    for path in paths:
        data = pd.read_csv(path)
        new_data = populate_dict(columns)

        for column in new_data:
            if column in data.columns:
                new_data[column] = data[column]
            else:
                new_data[column] = [''] * len(data[data.columns[0]])
        pd.DataFrame(new_data).to_csv(path, index=False)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python update_db_formats.py dbName")
        exit()
    main()
