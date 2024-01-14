## Randy's Review Questions

This repository contains the structure of a website containing multiple choice 
review questions that I have written for every class I've taken in high school 
and college, as well as a few other miscellaneous topics. The website is live 
and can be found here:
https://randys-review-questions.github.io/

Currently, the website is composed of a bunch of HTML pages, each including a
JavaScript script that dynamically generates the HTML for a practice quiz. Each of these 
pages corresponds to a directory within the `pages` directory. Within that directory, 
there are at least three files:
 * `index.html`: HTML source for the quiz page, most of which is dynamically generated 
 using `quizgenerate.js` in the `scripts` directory. An example of a static version of 
 such a page in *learn mode* can be found in `pages/nonAc/pokegeo/example.html`, and 
 a *test mode* example can be found in `pages/nonAc/pokegeo/example-test.html`.
 * `page_data.csv`: CSV containing metadata to be displayed on the page and whether to 
 allow question shuffling. A blank template can be found in the `templates` directory.
 * `questions.csv`: CSV database of questions and answer options for the quiz. A blank 
 template can be found in the `templates` directory.
 * Optionally, any images or helper documents that are displayed as part of a question 
 and/or answer option(s).

The pages are dependent on JavaScript for quiz generation and answer checking 
functionality, MathJax for rendering equations from a TeX source, and JQuery-CSV for 
parsing `.csv` files. 

The `scripts` directory contains scripts that are useful for this project:
 * `applet_db.js` contains functions that return JSON objects containing data that are 
 useful in the implementation of the Custom Quiz Generator.
 * `applet.js` contains functionality used by the applet (i.e. the Custom Quiz Generator),
 which treats the quiz questions on this site as a "bank" to pull a customized set of 
 questions from. This file contains the functionality to generate the HTML for custom 
 quizzes.
 * `checkans.js` contains an answer checker function, written in JavaScript, that is run 
 every time a user wishes to check their answers for a quiz. 
 * `gen_quiz_pgs.py` iterates through all page directories and creates `index.html` 
 files containing the HTML necessary to generate each quiz.
 * `htmlwriter.py` is a helper module containing code for generating units of HTML code.
 This was useful in earlier versions of the site when the bulk of the HTML was generated 
 using Python instead of JavaScript but is now obsolete.
 * `quizgenerate.js` contains the functionality to generate the HTML for a quiz page based 
 on information in the associated `page_data.csv` and `questions.csv` files.
 * `update_db_formats.py` updates the format of each `.csv` file in the page directories
 to match the equivalent template from the `templates` directory. 

The `css` directory contains `.css` code related to the styling of this site.

The `templates` directory contains blank templates for the `.csv` databases: `page_data.csv`
and `questions.csv`.

