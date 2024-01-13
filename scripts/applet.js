
////// "Smart" checkbox functionality 

// Updates all "children" of `id` to match whether or not `id` is checked, and unchecks 
// all "parents" of `id` if `id` is unchecked
function update_checkboxes(id) {
    update_children(id);
    update_parents();
    update_maxnumquestions();
}

function get_parents(id) {
    var tree = get_checkbox_tree();
    var parents = [];

    for (var candidate in tree) {
        if (tree[candidate].includes(id)) {
            parents.push(candidate);
        }
    }

    return parents;
}

function update_parents_backup(id) {
    if (!document.getElementById(id).checked) {
        for (var parent of get_parents(id)) {
            var parent_elem = document.getElementById(parent);
            if (parent_elem != null) {
                parent_elem.checked = false;
                update_parents_backup(parent);
            }
        }
    }
}

function update_parents() {
    var tree = get_checkbox_tree();
    var changed = true;
    while (changed) { // continue until no more changes are made 
        changed = false;
        for (var parent in tree) {
            var parent_node = document.getElementById(parent);
            if (parent_node != null) {
                var orig_checked = parent_node.checked;
                parent_node.checked = tree[parent].every(function (child) {
                    child = document.getElementById(child);
                    if (child != null) {
                        return child.checked;
                    }
                    return true;
                });
                if (orig_checked != parent_node.checked) {
                    changed = true;
                }
            }
        }
    }
}

function get_children(id) {
    var tree = get_checkbox_tree();
    if (id in tree) {
        return tree[id];
    }
    return [];
}

function update_children(id) {
    for (var child of get_children(id)) {
        var child_elem = document.getElementById(child);
        if (child_elem != null) {
            document.getElementById(child).checked = document.getElementById(id).checked;
            update_children(child);
        }
    }
}

function update_maxnumquestions() {
    var selected = get_selected_quizzes();
    var max_numquestions = 0;
    var quiz_lengths = get_quiz_lengths();
    for (var currSelected of selected) {
        max_numquestions += quiz_lengths[currSelected.id];
    }
    document.getElementById("max_numquestions").innerHTML = max_numquestions;
}

////// Show final configs functionality 

function showfinalconfigs() {
    document.getElementById("finalconfigsgenerate").style.display = "none";
    document.getElementById("finalconfigs").style.display = "block";
}

////// Quiz generation functionality 

async function appletquizgenerate() {
    var num_questions = document.getElementById("numquestions").value; 
    var max_numquestions = parseInt(document.getElementById("max_numquestions").innerHTML);
    
    // Error checking on input 
    if (num_questions == "") {
        window.alert("Please provide a number of questions.");
        return;
    }
    num_questions = parseInt(num_questions);
    if (isNaN(num_questions)) {
        window.alert("ERROR: Number of questions must be an integer.");
        return;
    }
    if (num_questions < 0 || num_questions > max_numquestions) {
        window.alert("ERROR: Number of questions must be between 0 and " + max_numquestions + ".");
        return;
    }

    clear();
    document.getElementById("quizbody").style.display = "none"; // hide quiz until finished generating
    document.getElementById("full_quiz").style.display = "none"; // hide generation button until finished generating 
    document.getElementById("progress").style.display = "block"; // show progress bar

    var test_mode = document.querySelector("input[name=mode]:checked").value == "test";
    var shuffle_qs = document.querySelector("input[name=shuffle]:checked").value == "yes";

    // Generate identifiers that each map to a question on the site 
    var candidate_q_ids = [...Array(max_numquestions).keys()];
    shuffle_arr(candidate_q_ids);
    var q_ids = candidate_q_ids.slice(0, num_questions);
    if (!shuffle_qs) {
        q_ids.sort((a, b) => parseInt(a) - parseInt(b));
    }

    // Retrieve paths to all quizzes selected 
    var selected = get_selected_quizzes();
    var question_paths = {};
    for (var currSelected of selected) {
        question_paths[currSelected.id] = "pages/" + currSelected.value + "/";
    }
    
    // Generate questions 
    var q_idx = 0;
    var progressbar = document.getElementById("progressbar");
    var PIXEL_WIDTH = 2;
    var progressbarwidth = progressbar.clientWidth - (2 * PIXEL_WIDTH);
    var answerKey = [];
    var curr_path = null;
    for (var q_id of q_ids) {
        // Retrieve question 
        var [question, path] = await get_question(q_id, question_paths);

        // Generate subheading if not shuffled and switching to a new course 
        if (!shuffle_qs && curr_path != path) {
            await fetch(path + "page_data.csv")
                .then(response => response.text())
                .then(response_text => {
                    page_data = $.csv.toObjects(response_text)[0];
                    append(doubletag("h3", page_data["Title"]));
                });
        }
        curr_path = path;

        // Generate question
        questiongenerate(question, q_idx, answerKey, test_mode, path);

        q_idx++;

        // Update progress bar 
        var progress_amt = q_idx / num_questions;
        document.getElementById("progressbarinner")
            .setAttribute("style", "width:" + Math.round(progress_amt * progressbarwidth).toString() + "px;");
        document.getElementById("progresspct").innerHTML = (progress_amt * 100).toFixed(2).toString() + "%"; // 2 decimal places 
    }

    // Generate answer checking functionality 
    checkansgenerate(answerKey, test_mode);

    // Add button for generating another quiz
    if (num_questions > 0 || test_mode) {
        append(singletag("br"));
    } 
    append(singletag("input", {
        "type" : "button",
        "class" : "mybutton",
        "value" : "Generate New Quiz",
        "id" : "full_quiz",
        "onclick" : "appletquizgenerate()"
    }));

    document.getElementById("progress").style.display = "none"; // hide progress bar when done 
    document.getElementById("progressbarinner").setAttribute("style", "width:0px;"); // reset progress bar 
    document.getElementById("progresspct").innerHTML = "0.00%";
    document.getElementById("full_quiz").style.display = "block"; // make generation button visible
    document.getElementById("quizbody").style.display = "block"; // make quiz visible 
    MathJax.typeset();
}

function get_selected_quizzes() {
    var selected = [];
    for (var config_category of get_config_categories()) {
        selected.push(...document.querySelectorAll("input[name=" + config_category + "]:checked"));
    }
    return selected;
}

async function get_question(q_id, question_paths) {
    var target_path = null;
    var quiz_lengths = get_quiz_lengths();
    for (quiz_id in question_paths) {
        var quiz_len = quiz_lengths[quiz_id];
        if (q_id < quiz_len) {
            target_path = question_paths[quiz_id];
            break;
        } else {
            q_id -= quiz_len;
        }
    }

    // Error checking 
    if (q_id < 0 || target_path == null) {
        window.alert("IMPOSSIBLE ERROR: Applet bug; question identifier out of range");
        return null;
    }

    var question = await fetch(target_path + "questions.csv")
        .then(response => response.text())
        .then(response_text => {
            var questions = $.csv.toObjects(response_text);
            return questions[q_id];
        });
    
    return [question, target_path];
}
