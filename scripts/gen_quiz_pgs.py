'''
gen_quiz_pgs.py

This script updates all quiz pages (HTML) to be reflective 
of the information in 'page_data.csv' and 'questions.csv'
in the corresponding directory. 

Example usage:
    python gen_quiz_pgs.py
'''

import os

import numpy as np 
import pandas as pd 

# Get all paths to directories containing inputted filename 
def get_all_paths(filename):
    result = list()
    for path, dirnames, filenames in os.walk('../'):
        if 'templates' not in path and filename in filenames:
            result.append(path + '/')
    return result 

def main():
    paths = get_all_paths('questions.csv')

if __name__ == '__main__':
    main()


