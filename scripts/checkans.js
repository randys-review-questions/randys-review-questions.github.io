function checkans(answerKey) {
    score = 0;

    email = true;

    for (var i = 0; i < answerKey.length; i++) {
        selected = document.querySelector("input[name=q" + (i + 1) + "]:checked");
        if (selected && selected.value == answerKey[i]) {
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