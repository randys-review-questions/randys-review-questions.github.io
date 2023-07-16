function checkans(answerKey) {
    score = 0;

    for (var i = 0; i < answerKey.length; i++) {
        result = checksingleans(i, answerKey, true);
        if (result) {
            score++;
        }
    }

    document.querySelector("#gapbeforescore").style.display = "none";
    document.querySelector("#score").innerHTML = "Score: " + score + "/" + answerKey.length;
    document.querySelector("#score").style.display = "block";
}

function checksingleans(number, answerKey, reveal) {
    // Extract options that the user selected 
    selected = document.querySelectorAll("input[name=q" + (number + 1) + "]:checked");
    values = [];
    for (const currSelected of selected) {
        values.push(currSelected.value)
    }
    
    // Check if user options match answer key 
    correct = JSON.stringify(values) == JSON.stringify(answerKey[number])
    if (correct) {
        document.querySelector("#q" + (number + 1) + "correct").style.display = "block";
        document.querySelector("#q" + (number + 1) + "incorrect").style.display = "none";
        document.querySelector("#q" + (number + 1) + "incorrectreveal").style.display = "none";
    } else if (reveal) {
        document.querySelector("#q" + (number + 1) + "incorrectreveal").style.display = "block";
        document.querySelector("#q" + (number + 1) + "correct").style.display = "none";
        document.querySelector("#q" + (number + 1) + "incorrect").style.display = "none";
    } else {
        document.querySelector("#q" + (number + 1) + "incorrect").style.display = "block";
        document.querySelector("#q" + (number + 1) + "correct").style.display = "none";
        document.querySelector("#q" + (number + 1) + "incorrectreveal").style.display = "none";
    }

    document.querySelector("#gapbeforescore").style.display = "inline";
    document.querySelector("#score").style.display = "none";
    return correct;
}