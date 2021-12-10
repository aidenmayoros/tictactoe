var hasWon = false

var boxes = {
    box1: null,
    box2: null,
    box3: null,
    box4: null,
    box5: null,
    box6: null,
    box7: null,
    box8: null,
    box9: null
};

/*
Checks if there is a winner then makes sure you can't enter into a box that is already filled.
Creates a P tag and inserts an "x" into that square.
*/


function clickBox(id) {
    if (hasWon) {
        return
    }
    var isTaken = boxes[id];
    if (isTaken) {
        return;
    }
    
    let x = document.createElement('p');
    document.getElementById(id).appendChild(x).textContent = "X";
    x.style.color = "blue";
    boxes[id] = "X";
    var values = Object.values(boxes);
    var emptyBoxes = values.filter(function (box) {
        return box === null
    });

// Function to check if the player has won the game.

    hasWon = checkForWinner("player");
    if (hasWon === true) {
        document.getElementById('win').appendChild(document.createElement('h1')).textContent = "Congrats You Won!"
        return
    }
// Check to see if each box is filled and there is no more room in array.

    var allIsTaken = Object.keys(boxes).filter(function(box){
        return !boxes[box]
    }).length === 0

// If there is no more spaces, game ends and is a tie.

    if (allIsTaken) {
        document.getElementById('win').appendChild(document.createElement('h1')).textContent = "Its a Tie!"
        document.getElementById('win').style.color = "yellow"
    } else {
        var computersTurn = computerPick(boxes);
    }
}

// Function to check if there are 3 in a row and by the parameter, if its the computer or the player.

function checkForWinner(type) {
    if (type == "computer") {
        var letter = "O"
    } else {
        var letter = "X"
    }

    if (boxes.box1 === letter && boxes.box2 === letter && boxes.box3 === letter) {
        return true
    }

    if (boxes.box1 === letter && boxes.box4 === letter && boxes.box7 === letter) {
        return true
    }

    if (boxes.box1 === letter && boxes.box5 === letter && boxes.box9 === letter) {
        return true
    }

    if (boxes.box2 === letter && boxes.box5 === letter && boxes.box8 === letter) {
        return true
    }

    if (boxes.box3 === letter && boxes.box5 === letter && boxes.box7 === letter) {
        return true
    }

    if (boxes.box3 === letter && boxes.box6 === letter && boxes.box9 === letter) {
        return true
    }

    if (boxes.box4 === letter && boxes.box5 === letter && boxes.box6 === letter) {
        return true
    }

    if (boxes.box7 === letter && boxes.box8 === letter && boxes.box9 === letter) {
        return true
    }
    
    return false
    
};

// If there is space in the box, put that box into the new array.

function computerPick(boxes) {
    
    var emptyBoxes = [];

    for (prop in boxes) {
        if (!boxes[prop]) {
            emptyBoxes.push(prop)
        }       
    }
    
/* Select a random position in the array of all the empty boxes and then create a P tag and place an "O" inside of it for the Computers turn*/

    var randomEmptyBoxNumber = Math.floor(Math.random()*emptyBoxes.length);
    var randomEmptyBox = emptyBoxes[randomEmptyBoxNumber];
    let o = document.createElement('p');
    document.getElementById(randomEmptyBox).appendChild(o).textContent = "O";
    boxes[randomEmptyBox] = "O";
    o.style.color = "red";

// Runs the winner check function for the computer, and if its true ends the game and lets the user know they lost.

    hasWon = checkForWinner("computer");
    if (hasWon === true) {
        document.getElementById('win').appendChild(document.createElement('h1')).textContent = "You lose!!"
        document.getElementById('win').style.color = "red"
    }
    
    
}
