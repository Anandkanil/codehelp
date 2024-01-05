const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info')
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//let's create function to initialise the Game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //resetting all UI elements
    boxes.forEach((box, index) => {
        box.classList.remove("win");
        box.classList.remove("tied");
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] == "X") && gameGrid[position[1]] == "X" && gameGrid[position[2]] == "X") {
            answer = "X";
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
        }
        else if (gameGrid[position[0]] == "O" && gameGrid[position[1]] == "O" && gameGrid[position[2]] == "O") {
            answer = "O";
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

        }
    });

    //Means we got a winner
    if (answer != "") {
        gameInfo.innerText = `Winner is ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //now we check if all columns are filled or not
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") fillCount++;
    });
    if (fillCount == 9) {
        gameInfo.innerText = "Game Tied !";
        boxes.forEach((box) => {
            box.classList.add("tied");
        })
        newGameBtn.classList.add("active");
    }


}

//adding event Listeners to all boxes
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

function handleClick(index) {
    //checking if the clicked box is empty
    if (gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        //swap turn
        swapTurn();
        //checking if anyone won the game
        checkGameOver();
    }
}

newGameBtn.addEventListener('click', initGame);