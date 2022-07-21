const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const toWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let placeHolder = ["", "", "", "", "", "", "", "", ""];
let moveArray = [];
let turnCounter = 0;

let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    previousButton.addEventListener("click", previousTurn);
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(placeHolder[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    placeHolder[index] = currentPlayer;
    cell.textContent = currentPlayer;
    moveArray.push(index);
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < toWin.length; i++){
        const condition = toWin[i];
        const cellA = placeHolder[condition[0]];
        const cellB = placeHolder[condition[1]];
        const cellC = placeHolder[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!placeHolder.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    placeHolder = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function previousTurn(){
    
    if(turnCounter === 0){
        return;
    }
    //placeHolder.splice(moveArray[turnCounter - 1],1)//
    let lastMove = document.getAttribute(`cellIndex${moveArray[turnCounter - 1]}`)//
    placeHolder.splice(lastMove,1)
}