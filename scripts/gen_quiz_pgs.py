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

# Programmatically write HTML quiz page based on questions and page data 
def write_html(path):
    page_data = pd.read_csv(f'{path}/page_data.csv') 
    question_data = pd.read_csv(f'{path}/questions.csv')
    answerKey = []

    # Generate html for head 
    head = htmlwriter.double_tag('title', 'Randy\'s Review Questions')
    head += htmlwriter.single_tag('link', {'rel':'stylesheet', 'href':'../../css/style.css', 'type':'text/css'})
    head += htmlwriter.double_tag('script', '', {'src':'https://polyfill.io/v3/polyfill.min.js?features=es6'})
    head += htmlwriter.double_tag('script', '', {'id':'MathJax-script', 'async':'', 'src':'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'})
    head = htmlwriter.double_tag('head', head)

    # Generate html for body of page 
    body = htmlwriter.double_tag('h1', 'Randy\'s Review Questions')
    body += htmlwriter.double_tag('h2', page_data['Title'][0])
    body += htmlwriter.double_tag('p', page_data['Description'][0])
    body += htmlwriter.single_tag('hr')

    # Append data for each quiz question 
    for q_idx in range(len(question_data)):
        question = question_data['Question'][q_idx]
        q_lines = question.split('\n')
        first_line = True
        for q_line in q_lines:
            if not first_line:
                body += htmlwriter.double_tag('p', f'{q_line}', {'class':'question'})
            else:
                body += htmlwriter.double_tag('p', f'{q_idx + 1}. {q_line}', {'class':'question'})
            first_line = False
        
        # Add preformatted text (e.g. code sample) if provided 
        pre_text = question_data['Preformatted'][q_idx] 
        if is_nonempty(pre_text):
            body += htmlwriter.double_tag('pre', pre_text)

        img_src = question_data['Image'][q_idx] # Add image if a source image provided 
        if is_nonempty(img_src):
            body += htmlwriter.single_tag('img', {'src':img_src, 'alt':img_src})

        # Append data for each answer option 
        answers = ''
        is_checkbox = question_data['Type'][q_idx] == 'Checkboxes'
        button_type = 'checkbox' if is_checkbox else 'radio'
        for a_idx in range(15): # Loop through the 15 answer options supported by the template
            answer = question_data[f'Option {a_idx+1}'][q_idx]
            answer_img = question_data[f'Image {a_idx+1}'][q_idx]
            if is_nonempty(answer):
                answers += htmlwriter.single_tag('input', {'type':button_type, 'name':f'q{q_idx+1}', 'value':f'{a_idx+1}'})
                answers += str(answer) 
                if is_nonempty(answer_img):
                    answers += htmlwriter.single_tag('img', {'src':answer_img, 'alt':answer_img})
                answers += htmlwriter.single_tag('br')
        body += htmlwriter.double_tag('ul', answers)
            
        # Extract correct answer(s)
        correct_answer = question_data['Correct Answer'][q_idx]
        correct_answer = str(correct_answer).split(',')
        answerKey.append(correct_answer)
        correct_text = list()
        for opt_num in correct_answer:
            correct_text.append(str(question_data[f'Option {opt_num}'][q_idx]))
        correct_text = ', '.join(correct_text)

        # Add hidden 'Correct' and 'Incorrect' displays
        body += htmlwriter.double_tag('p', 'Correct!', {'id':f'q{q_idx+1}correct', 'style':'color:green;display:none;'})
        incorrect_text = htmlwriter.double_tag('span', 'Incorrect.', {'style':'color:purple;'})
        correct_reveal = 'answers were' if is_checkbox else 'answer was'
        body += htmlwriter.double_tag('p', f'{incorrect_text} The correct {correct_reveal}: {correct_text}', {'id':f'q{q_idx+1}incorrect', 'style':'display:none;'})
    
    # Add HTML related to checking answers 
    body += htmlwriter.double_tag('h3', '', {'id':'score', 'style':'color:blue;display:none;'})
    body += htmlwriter.single_tag('input', {'type':'button', 'onclick':'checkquizans()', 'value':'Check Answers'})
    body += htmlwriter.single_tag('br')

    # Page footer 
    body += htmlwriter.single_tag('hr')
    body += htmlwriter.double_tag('a', 'Return to Home', {'href':'../../index.html'})

    # JS related to checking answers 
    body += htmlwriter.double_tag('script', '', {'src':'../../scripts/checkans.js'})
    answerKey = str(answerKey).replace('\'', '"')
    function = f'function checkquizans() {{ answerKey = {answerKey}; checkans(answerKey); }}'
    body += htmlwriter.double_tag('script', function)
    noscript_msg = htmlwriter.double_tag('p', 'Looks like JavaScript is disabled! The answer checker will not work without JavaScript enabled.')
    body += htmlwriter.double_tag('noscript', noscript_msg)
        
    with open(f'{path}/index.html', 'w') as f:
        f.write('<!DOCTYPE html>\n')
        f.write(htmlwriter.double_tag('html', head + body))
        

def main():
    paths = get_all_paths('questions.csv', 'page_data.csv')
    for path in paths:
        print('Generating HTML in:', f'{path}index.html')
        write_html(path)

if __name__ == '__main__':
    main()


