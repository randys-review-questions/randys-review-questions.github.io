async function quizgenerate(test = false, shuffle = false) {
    var node;

    //// Generate header 

    // Parse metadata
    await fetch("page_data.csv")
        .then(response => response.text())
        .then(response_text => {
            var page_data = $.csv.toObjects(response_text)[0];
            document.getElementById("title").innerHTML = page_data["Title"];
            document.getElementById("description").innerHTML = page_data["Description"];
        });
    
    // Generate learn/test mode switch 
    node = doubletag("p", "You are currently in " + (test ? "test" : "learn") + " mode. ");
    node.appendChild(
        doubletag("a", "To switch to " + (test ? "learn" : "test") + " mode, click here.",
            {"href":(test ? "index.html" : "test.html")})
    );
    document.getElementById("modeswitch").innerHTML = node.innerHTML;

    //// Generate quiz body 

    clear();
    var answerKey = []
    await fetch("questions.csv")
        .then(response => response.text())
        .then(response_text => {
            var questions = $.csv.toObjects(response_text);
            if (shuffle) {
                // shuffle questions 
                shuffle_arr(questions)
            }
            for (var q_idx in questions) {
                // Generate question 
                q_idx = parseInt(q_idx);
                var question = questions[q_idx];
                questiongenerate(question, q_idx, answerKey, test);
            }
        });

        // If in test mode, add button for checking all answers and calculating score 
        if (test) {
            append(singletag("br", {"id":"gapbeforescore"}));
            append(doubletag("h3", "", {"id":"score", "style":"color:blue;display:none;"}));
            append(singletag("input", {
                "type":"button",
                "onclick":"checkquizans()",
                "id":"full_quiz",
                "class":"mybutton",
                "value":"Check Answers"
            }))
        }
        append(singletag("br"));

        //// Generate answer checker scripts 

        answerKey = JSON.stringify(answerKey);
        var func = null;
        if (test) {
            func = "function checkquizans() { answerKey = " + answerKey + "; checkans(answerKey); }";
        } else {
            func = "function checkquestionans(number) { answerKey = " + answerKey + "; checksingleans(number, answerKey); }";
        }
        document.getElementById("answerchecker").innerHTML = func;

        MathJax.typeset()
}

function questiongenerate(question, q_idx, answerKey, test = false) {
    var MAX_NUM_OPTIONS = 15; // max number of answer options supported by template 

    var question_text = question["Question"];
    var q_lines = question_text.split("\n");
    var first_line = true;
    for (var q_line of q_lines) {
        if (!first_line) {
            append(doubletag("p", q_line, {"class":"question"}));
        } else {
            append(doubletag("p", (q_idx + 1) + ". " + q_line, {"class":"question"}));
        }
        first_line = false;
    }

    // Add preformatted text if provided 
    var pre_text = question["Preformatted"];
    if (pre_text != "") {
        append(doubletag("pre", pre_text));
    }

    // Add image if source provided 
    var img_src = question["Image"];
    if (img_src != "") {
        append(singletag("img", {"src":img_src, "alt":img_src}))
    }

    // Generate answer options 
    var answers = doubletag("ul", "", {"class":"answers"});
    var is_checkbox = question["Type"] == "Checkboxes";
    var button_type = is_checkbox ? "checkbox" : "radio";
    for (var a_idx = 0; a_idx < MAX_NUM_OPTIONS; a_idx++) {
        a_idx = parseInt(a_idx);
        var answer = question["Option " + (a_idx + 1)];
        var answer_img = question["Image " + (a_idx + 1)];
        if (answer != "") {
            answers.appendChild(singletag("input", 
                {"type":button_type, "name":("q"+(q_idx+1)), "value":(a_idx+1)}
            ));
            answers.innerHTML += answer;
            if (answer_img != "") {
                answers.appendChild(singletag("img",
                    {"src":answer_img, "alt":answer_img}
                ));
            }
            answers.appendChild(singletag("br"));
        }
    }
    append(answers);

    // Add button for checking answer for this question if in learn mode 
    if (!test) {
        append(singletag("input", {
            "type":"button", 
            "onclick":("checkquestionans(" + q_idx + ")"),
            "id":"single_question",
            "class":"mybutton",
            "value":"Check Answer"
        }));
        append(singletag("br"));
    }

    // Extract correct answer(s)
    var correct_answer = question["Correct Answer"].split(",");
    answerKey.push(correct_answer);
    var correct_text = [];
    for (var opt_num of correct_answer) {
        correct_text.push(question["Option " + opt_num]);
    }
    correct_text = correct_text.join(", ");

    // Add hidden 'Correct' and 'Incorrect' displays 
    append(doubletag("p", "Correct!", {
        "id":("q"+(q_idx+1)+"correct"), 
        "style":"color:green;display:none;"
    }));
    var incorrect_text = doubletag("span", "Incorrect.", {"style":"color:purple;"});
    incorrect_text = doubletag("p", incorrect_text, {
        "id":("q"+(q_idx+1)+"incorrect"),
        "style":"display:none;"
    });
    if (test) {
        var correct_reveal = is_checkbox ? "answers were" : "answer was";
        incorrect_text.innerHTML += " The correct " + correct_reveal + ": " + correct_text;
    } else {
        incorrect_text.innerHTML += " Try again.";
    }
    append(incorrect_text);
}

function append(element) {
    document.getElementById("quizbody").appendChild(element);
}

function clear() {
    document.getElementById("quizbody").innerHTML = "";
}

function doubletag(tag, content, attributes = null) {
    var node = singletag(tag, attributes);
    if (typeof content == "string") {
        node.innerHTML = content;
    } else {
        node.appendChild(content);
    }

    return node 
}

function singletag(tag, attributes = null) {
    var node = document.createElement(tag);

    // Set attributes 
    if (attributes != null) {
        for (var key in attributes) {
            node.setAttribute(key, attributes[key]);
        }
    }

    return node 
}

// This function was taken from: https://javascript.info/task/shuffle
// Thanks!
function shuffle_arr(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

