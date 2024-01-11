'''
gen_quiz_pgs.py

This script updates all quiz pages (HTML) to be reflective 
of the information in 'page_data.csv' and 'questions.csv'
in the corresponding directory. 

Example usage:
    python gen_quiz_pgs.py
'''

import os
import math 

import htmlwriter

import numpy as np 
import pandas as pd 

# Specifies start of paths (starting after "pages/") to pages where questions should be shuffled 
TO_SHUFFLE = ["f16", "f17", "f18", "f19", "f20", "s21", "f21", "s22", "su22", "f22", "s23", "f23", "s24"]

# Get all paths to directories containing inputted filenames 
def get_all_paths(filename1, filename2):
    result = list()
    for path, dirnames, filenames in os.walk('../'):
        if 'templates' not in path and filename1 in filenames and filename2 in filenames:
            result.append(f'{path}/')
    return result 

# Returns true if data element is nonempty
def is_nonempty(elem):
    if isinstance(elem, str):
        return elem != ''
    else:
        return not math.isnan(elem)

# Programmatically write HTML quiz page 
def write_html(path, target, test=False):
    print('Generating HTML in:', f'{path}{target}')
    path_suffix = path[path.find("pages") + len("pages/"):]
    shuffle = any(map(lambda x : path_suffix.startswith(x + "/") or path_suffix.startswith(x + "\\"), TO_SHUFFLE))

    html = f"""<!DOCTYPE html>
<html>
    <head>
        <title>Randy's Review Questions</title>
        <link rel="stylesheet" href="../../../css/style.css" type="text/css" />
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.js" integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA=" crossorigin="anonymous"></script>
        <script src="https://evanplaice.github.io/jquery-csv/src/jquery.csv.js"></script>
        <script id="MathJax-script" async=""
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
        </script>
    </head>
    <body id="page">
        <script src="../../../scripts/quizgenerate.js"></script>
        <script>quizgenerate(test = {"true" if test else "false"}, shuffle = {"true" if shuffle else "false"});</script>
    </body>
</html>"""
        
    with open(f'{path}/{target}', 'w') as f:
        f.write(html)
        

def main():
    paths = get_all_paths('questions.csv', 'page_data.csv')
    for path in paths:
        write_html(path, 'index.html', test=False)
        write_html(path, 'test.html', test=True)

if __name__ == '__main__':
    main()


