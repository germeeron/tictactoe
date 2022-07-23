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

startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", clickCell));
    previousButton.addEventListener("click", previousTurn);
    nextButton.addEventListener("click", nextTurn);
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function clickCell(){
    const cellIndex = this.getAttribute("cellIndex");

    if(placeHolder[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    turnCounter++;
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
        previousButton.disabled = false;
        nextButton.disabled = false;
        running = false;
    }
    else if(!placeHolder.includes("")){
        statusText.textContent = `Draw!`;
        previousButton.disabled = false;
        nextButton.disabled = false;
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
    previousButton.disabled = true;
    nextButton.disabled = true;
    while (moveArray.length) moveArray.pop();
    turnCounter = 0;
    running = true;
}


function previousTurn(){
    
    if(turnCounter === 0){
        alert("oops!");
        return;
    }

    let lastMove = document.querySelector(`[cellIndex="${moveArray[turnCounter - 1]}"]`); //cell index of the last turn
    placeHolder.splice(moveArray[turnCounter - 1],1);
    
    lastMove.textContent = "";
    turnCounter--;
}

function nextTurn(){
    
    if(turnCounter === moveArray.length){
        alert("oops!");
        return;
    }

    let nextMove = document.querySelector(`[cellIndex="${moveArray[turnCounter]}"]`); //cell index of the next turn
    placeHolder.unshift(moveArray[turnCounter]);
    
    if (turnCounter % 2 === 0)
        nextMove.textContent = "X";
    else
        nextMove.textContent = "O";
    turnCounter++;
}