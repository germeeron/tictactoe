const cells = document.querySelectorAll(".cell");
const pButton = document.getElementById("previousButton");
const nButton = document.getElementById("nextButton");
const rButton = document.getElementById("restartButton");

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

let placeHolder = [
    ["", "", ""], 
    ["", "", ""], 
    ["", "", ""]]
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    rButton.addEventListener("click", restartGame);
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < toWin.length; i++){
        const condition = toWin[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        running = false;
    }

    else if(!options.includes("")){
        running = false;
    }

    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    let options = [
        ["", "", ""], 
        ["", "", ""], 
        ["", "", ""]
    ]
    cells.forEach(cell => cell.textContent = "");
    running = true;
}




/*
const arrayName = [
    [0, 1, 2],
    [3, X, 5],
    [6, 7, 8]
];

arrayName[2][1];


moveArray [{
    row: 1;
    col: 1;
    symbol: X
}
{
    row: 0;
    col: 2;
    symbol: X
}]


moveArray [{
    row: 1;
    col: 1;
    symbol: X
}]


get that and put it in moveArray
*/