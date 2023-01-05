function checkans(answerKey) {
    score = 0;

    for (var i = 0; i < answerKey.length; i++) {
        // Extract options that the user selected 
        selected = document.querySelectorAll("input[name=q" + (i + 1) + "]:checked");
        values = [];
        for (const currSelected of selected) {
            values.push(currSelected.value)
        }
        
        // Check if user options match answer key 
        if (JSON.stringify(values) == JSON.stringify(answerKey[i])) {
            document.querySelector("#q" + (i + 1) + "correct").style.display = "block";
            document.querySelector("#q" + (i + 1) + "incorrect").style.display = "none";
            score++;
        } else {
            document.querySelector("#q" + (i + 1) + "incorrect").style.display = "block";
            document.querySelector("#q" + (i + 1) + "correct").style.display = "none";
        }
    }

    document.querySelector("#score").innerHTML = "Score: " + score + "/" + answerKey.length;
    document.querySelector("#score").style.display = "block";
}