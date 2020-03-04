'use strict';

var secret = pickNum(4);
var table = document.getElementById("table");
var start = false;


function pickNum(len) {
    return "0123456789".split('')
        .sort(function () {
            return Math.random() - 0.5
        })
        .slice(0, len)
        .join('');
}

function guess() {
    var input = document.getElementById('input').value;

    if (/^\d+$/.test(input) && input.length == 4) {
        var b = 0;
        var c = 0;
        for (var i = 0; i < secret.length; i++) {
            if (input.charAt(i) == secret.charAt(i))
                b++;
            else if (secret.indexOf(input.charAt(i)) > -1)
                c++;
        }

        if (b == 4)
            alert("You won after " + (table.rows.length - 2) + " guesses!");
        else {
            if (!start) {
                start = true;
                table.deleteRow(2);
            }
            insertRow(-1, input, b, c);
        }
    } else
        alert("Input must be a 4 digit number");
}

function newGame() {
    while (table.rows.length > 2)
        table.deleteRow(-1);

    insertRow(2, '????', 4, 0);
    document.getElementById('input').value = "";
    start = false;
}


function insertRow(index, guess, b, c) {
    var row = table.insertRow(index);
    row.setAttribute('class', 'guess');

    var cell = row.insertCell(0);
    cell.setAttribute('class', 'num');
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);

    cell.innerHTML = guess;
    cell1.innerHTML = b;
    cell2.innerHTML = c;
}
