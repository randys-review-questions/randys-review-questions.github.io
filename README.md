## Randy's Review Questions

This repository contains the structure of a website containing multiple choice 
review questions that I have written for every class I've taken in high school 
and college, as well as a few other miscellaneous topics. The website is live 
and can be found here:
https://randys-review-questions.github.io/

Currently, the website is composed of a bunch of static HTML pages, each containing
the HTML for a practice quiz. Each of these pages corresponds to a directory 
within the `pages` directory. Within that directory, there are at least four files:
 * `index.html`: HTML source for the quiz page in *learn mode*, generated from 
 `gen_quiz_pgs.py` in the `scripts` directory. Thus, it is not very readable to humans. 
 You can copy and paste the code into a beautifier or find a human-written example in 
 `pages/nonAc/pokegeo/example.html`.
 * `test.html`: HTML source for the quiz page in *test mode*, also generated from 
 `gen_quiz_pgs.py`. A human-written example can be found in 
 `pages/nonAc/pokegeo/example-test.html`.
 * `page_data.csv`: CSV containing metadata to be displayed on the page. A blank 
 template can be found in the `templates` directory.
 * `questions.csv`: CSV database of questions and answer options for the quiz. A blank 
 template can be found in the `templates` directory.
 * Optionally, any images or helper documents that are displayed as part of a question 
 and/or answer option(s).

The pages are dependent on JavaScript for answer checking functionality, and MathJax for
rendering equations from a TeX source. 

The `scripts` directory contains scripts that are useful for this project:
 * `checkans.js` contains an answer checker function, written in JavaScript, that is run 
 every time a user wishes to check their answers for a quiz. 
 * `gen_quiz_pgs.py` iterates through all page directories and updates the source in 
 `index.html` to match the data and questions in `page_data.csv` and `questions.csv`. 
 During development, I would modify one or more of the `.csv` files and then run this 
 script for the updates to be reflected in the `.html` page.
 * `htmlwriter.py` is a helper module containing code for generating units of HTML code.
 * `update_db_formats.py` updates the format of each `.csv` file in the page directories
 to match the equivalent template from the `templates` directory. 

The `css` directory contains `.css` code related to the styling of this page.

The `templates` directory contains blank templates for the `.csv` databases: `page_data.csv`
and `questions.csv`.

The current approach works, but requires script(s) to be run every time an update is made to 
the underlying `.csv` databases. One alternative may be a more dynamic approach, generating 
the HTML from the databases upon loading a page. Such an approach would likely require a more 
sophisticated website design involving PHP. 

