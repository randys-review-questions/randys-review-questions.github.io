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
def write_html(path, target):
    print('Generating HTML in:', f'{path}{target}')

    html = f"""<!DOCTYPE html>
<html>
    <head>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NY9B26E228"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){{dataLayer.push(arguments);}}
        gtag('js', new Date());

        gtag('config', 'G-NY9B26E228');
        </script>
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
        <h1>Randy's Review Questions</h1>
        <h2 id="title"></h2>
        <p id="description"></p>
        <div id="configure">
            <strong>Configuration Settings:</strong>
            <br /> <br />
            <em>Mode: </em>
            <br />
            <input type="radio" name="mode" value="learn" checked> Learn 
            <input type="radio" name="mode" value="test"> Test 
            <br /> <br />
            <span id="shuffleconfig" style="display:none;">
                <em>Shuffle Question Order:</em>
                <br />
                <input type="radio" name="shuffle" value="yes" checked> Yes 
                <input type="radio" name="shuffle" value="no"> No 
                <br /> <br />
            </span>
            <input type="button" value="Regenerate Quiz" onclick="quizgenerate()">
            <br />
            <p></p>
        </div>
        <hr />
        <span id="quizbody"><script id="answerchecker"></script></span>
        <script src="../../../scripts/checkans.js"></script>
        <script src="../../../scripts/quizgenerate.js"></script>
        <script>quizgenerate();</script>
        <noscript>
            <p>
                Looks like JavaScript is disabled! The quiz cannot be generated without JavaScript enabled.
            </p>
        </noscript>
        <hr />
        <a href="../../../index.html">Return to Home</a>
    </body>
</html>"""
        
    with open(f'{path}/{target}', 'w') as f:
        f.write(html)
        

def main():
    paths = get_all_paths('questions.csv', 'page_data.csv')
    for path in paths:
        write_html(path, 'index.html')

if __name__ == '__main__':
    main()


