var hasWon = false;

var boxes = {
  box1: null,
  box2: null,
  box3: null,
  box4: null,
  box5: null,
  box6: null,
  box7: null,
  box8: null,
  box9: null,
};

function clickBox(id) {
  if (hasWon) {
    return;
  }
  var isTaken = boxes[id];
  if (isTaken) {
    return;
  }

  let x = document.createElement("p");
  document.getElementById(id).appendChild(x).textContent = "X";
  x.style.color = "blue";
  boxes[id] = "X";
  var values = Object.values(boxes);
  var emptyBoxes = values.filter(function (box) {
    return box === null;
  });

  hasWon = checkForWinner("player");
  if (hasWon === true) {
    document
      .getElementById("win")
      .appendChild(document.createElement("h1")).textContent =
      "Congrats You Won!";
    return;
  }

  var allIsTaken =
    Object.keys(boxes).filter(function (box) {
      return !boxes[box];
    }).length === 0;

  if (allIsTaken) {
    document
      .getElementById("win")
      .appendChild(document.createElement("h1")).textContent = "Its a Tie!";
    document.getElementById("win").style.color = "yellow";
  } else {
    var computersTurn = computerPick(boxes);
  }
}

function checkForWinner(type) {
  if (type == "computer") {
    var letter = "O";
  } else {
    var letter = "X";
  }

  if (boxes.box1 === letter && boxes.box2 === letter && boxes.box3 === letter) {
    return true;
  }

  if (boxes.box1 === letter && boxes.box4 === letter && boxes.box7 === letter) {
    return true;
  }

  if (boxes.box1 === letter && boxes.box5 === letter && boxes.box9 === letter) {
    return true;
  }

  if (boxes.box2 === letter && boxes.box5 === letter && boxes.box8 === letter) {
    return true;
  }

  if (boxes.box3 === letter && boxes.box5 === letter && boxes.box7 === letter) {
    return true;
  }

  if (boxes.box3 === letter && boxes.box6 === letter && boxes.box9 === letter) {
    return true;
  }

  if (boxes.box4 === letter && boxes.box5 === letter && boxes.box6 === letter) {
    return true;
  }

  if (boxes.box7 === letter && boxes.box8 === letter && boxes.box9 === letter) {
    return true;
  }

  return false;
}

function computerPick(boxes) {
  var emptyBoxes = [];

  for (prop in boxes) {
    if (!boxes[prop]) {
      emptyBoxes.push(prop);
    }
  }

  var randomEmptyBoxNumber = Math.floor(Math.random() * emptyBoxes.length);
  var randomEmptyBox = emptyBoxes[randomEmptyBoxNumber];
  let o = document.createElement("p");
  document.getElementById(randomEmptyBox).appendChild(o).textContent = "O";
  boxes[randomEmptyBox] = "O";
  o.style.color = "red";

  hasWon = checkForWinner("computer");
  if (hasWon === true) {
    document
      .getElementById("win")
      .appendChild(document.createElement("h1")).textContent = "You lose!!";
    document.getElementById("win").style.color = "red";
  }
}
