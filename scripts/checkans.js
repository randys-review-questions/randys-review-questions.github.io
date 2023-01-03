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

    const fs = require('fs');
    const content = 'Some content';
    fs.writeFile('responses.csv', content, err => {
        if (err) {
            console.error(err);
        }
    });

    // This code copied from Stack Overflow: 
    // https://stackoverflow.com/questions/15722765/saving-a-text-file-on-server-using-javascript
    var data = new FormData();
    data.append("data" , "the_text_you_want_to_save");
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
    xhr.open('post', '../../scripts/response_handler.php', true );
    xhr.send(data);
}