/*
    Gameboard: just one instance, so this is done using a module. Every function inside is private, so the array can not be modified without using the provided functions.
    DisplayController or something similar could also be ddone using a module.
    
    Both of the above can probably be done inside the gameBoard module, we'll see..

    Player object has several instances. Most likely two. These are done using factory functions.
    Player object needs name and a score.
*/

const gameBoard = (function(){
    let gameBoardArray = new Array(9);
    for (let i = 0; i < 9; i++){
        gameBoardArray[i] = " ";
    }
    const getGameBoard = () => {
        return gameBoardArray;
    }
    const setBox = (index, value) => {
        return gameBoardArray[index] = value;
    }

    const getBox = (index) => {
        return gameBoardArray[index];
    }

    const resetBoard = () => {
        for (let i = 0; i < 9; i++){
            gameBoardArray[i] = " ";
            renderBoard();
        }
    }
    
    const renderBoard = () => {
        for (let i = 0; i < 9; i++){
            document.getElementById(i).innerHTML = gameBoardArray[i];
        }
    }
    return {
        setBox, getBox, getGameBoard, resetBoard, renderBoard
    }
})();

const createPlayer = function () {
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;
    const resetScore = () => score = 0;
    return { score, getScore, giveScore, resetScore };
}

//gameController module that gives onClick events for each of the gameBoxes, possibly handles other gameflow mechanics too:
const gameController = (function() {
    let playerTurn = 1;
    let player1 = createPlayer();
    let player2 = createPlayer();
    const initOnClick = () => {
        let gameBoxes = document.querySelectorAll(".gameBox");
        for (let i = 0; i < 9; i++) {
            gameBoxes[i].onclick = function() {boxClick(i, playerTurn)};
        }
        document.querySelector(".resetButton").onclick = function() {resetClick()}
    }

    const boxClick = (id) => {
        console.log("clicked box: " + id);
        if (playerTurn % 2 == 1) {
            gameBoard.setBox(id, "X");
            playerTurn++;
            gameBoard.renderBoard();
        }
        else {
            gameBoard.setBox(id, "O");
            playerTurn++;
            gameBoard.renderBoard();
        }
    }

    const checkWin = () => {
        //check all possible winning lines and if winning condition is reached, end the game.
    }

    const resetClick = () => {
        player1.resetScore();
        player2.resetScore();
        gameBoard.resetBoard();
    }
    initOnClick();
})();

