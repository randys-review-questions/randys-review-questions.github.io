'''
htmlwriter.py

This file contains functions that assist with writing 
HTML code, reflective of common patterns in HTML.

This is a module meant to be imported, NOT as a 
standalone script.
'''

def double_tag(tag, content, pairs=dict()):
    result = f'<{tag}'
    for pair in pairs:
        result += f' {pair}=\"{pairs[pair]}\"'
    result += f'>{content}</{tag}>'
    if '<pre>' in content:
        result = '\n'.join(content.split(' \linebreak '))
    return result

def single_tag(tag, pairs=dict()):
    result = f'<{tag}'
    for pair in pairs:
        result += f' {pair}=\"{pairs[pair]}\"'
    result += f' />'
    return result 

if __name__ == '__main__':
    print('This file does not contain a main script.')
    exit()

