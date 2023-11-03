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
    return { score, getScore, giveScore, resetScore};
}

//gameController module that gives onClick events for each of the gameBoxes, possibly handles other gameflow mechanics too:
const gameController = (function() {
    let playerTurn = 1;
    let gameResult = 0; // Shows the status and winner of the game. 0=game going, 1 and 2=player won, -1=draw
    let player1 = createPlayer();
    let player2 = createPlayer();
    const initOnClick = () => {
        let gameBoxes = document.querySelectorAll(".gameBox");
        for (let i = 0; i < 9; i++) {
            gameBoxes[i].onclick = function() {boxClick(i)};
        }
        document.querySelector(".resetButton").onclick = function() {resetClick()}
    }

    const boxClick = (id) => {
        console.log("clicked box: " + id);
        if(gameBoard.getBox(id) == " " && gameResult == 0){
            if (playerTurn % 2 == 1) {
                gameBoard.setBox(id, "X");
                playerTurn++;
                gameBoard.renderBoard();
                checkWin();
            }
            else {
                gameBoard.setBox(id, "O");
                playerTurn++;
                gameBoard.renderBoard();
                checkWin();
            }
        }
    }

    const getPlayerTurn = () => {
        return playerTurn;
    }

    const checkWin = () => {
        //check all possible winning lines and if winning condition is reached, end the game.
        //3 + 3 horizontal + vertical lines. Two diagonals => 8 total possible lines.
        //There must be a better way of doing this. But I suppose this will do..
        let Board = gameBoard.getGameBoard();
        if(Board[0] == "X" && Board[1] == "X" && Board[2] == "X"){
            gameResult = 1;
        }
        else if(Board[0] == 'O' && Board[1] == 'O' && Board[2] == 'O'){
            gameResult = 2;
        }
        else if(Board[3] == 'X' && Board[4] == 'X' && Board[5] == 'X'){
            gameResult = 1;
        }
        else if(Board[3] == 'O' && Board[4] == 'O' && Board[5] == 'O'){
            gameResult = 2;
        }
        else if(Board[6] == 'X' && Board[7] == 'X' && Board[8] == 'X'){
            gameResult = 1;
        }
        else if(Board[6] == 'O' && Board[7] == 'O' && Board[8] == 'O'){
            gameResult = 2;
        }
        else if(Board[0] == 'X' && Board[3] == 'X' && Board[6] == 'X'){
            gameResult = 1;
        }
        else if(Board[0] == 'O' && Board[3] == 'O' && Board[6] == 'O'){
            gameResult = 2;
        }
        else if(Board[1] == 'X' && Board[4] == 'X' && Board[7] == 'X'){
            gameResult = 1;
        }
        else if(Board[1] == 'O' && Board[4] == 'O' && Board[7] == 'O'){
            gameResult = 2;
        }
        else if(Board[2] == 'X' && Board[5] == 'X' && Board[8] == 'X'){
            gameResult = 1;
        }
        else if(Board[2] == 'O' && Board[5] == 'O' && Board[8] == 'O'){
            gameResult = 2;
        }
        else if(Board[0] == 'X' && Board[4] == 'X' && Board[8] == 'X'){
            gameResult = 1;
        }
        else if(Board[2] == 'O' && Board[4] == 'O' && Board[6] == 'O'){
            gameResult = 2;
        }

        if(gameResult != 0){
            gameEnd(gameResult);
        }
        //Draw scenario
        else if(!Board.includes(" ") && gameResult == 0){
            console.log("hit draw");
            gameResult = -1;
            gameEnd(gameResult);
        }

    }

    const resetClick = () => {
        player1.resetScore();
        player2.resetScore();
        document.getElementById("P1score").innerHTML = "Score: " + player1.getScore();
        document.getElementById("P2score").innerHTML = "Score: " + player2.getScore();
        gameOver = false;
        gameResult = 0;
        gameBoard.resetBoard();
    }

    const gameEnd = (result) => {
        console.log("game ended with result: " + result);
        if(result == 1){
            player1.giveScore();
            document.getElementById("P1score").innerHTML = "Score: " + player1.getScore();
            document.querySelector(".resultText").innerHTML = "Player 1 wins!";
            setTimeout(() => {
                gameBoard.resetBoard();
                gameResult = 0;
                document.querySelector(".resultText").innerHTML = "";
                playerTurn = 1;
            }, 3000)
        }
        else if(result == 2){
            player2.giveScore();
            document.getElementById("P2score").innerHTML = "Score: " + player2.getScore();
            document.querySelector(".resultText").innerHTML = "Player 2 wins!";
            setTimeout(() => {
                gameBoard.resetBoard();
                gameResult = 0;
                document.querySelector(".resultText").innerHTML = "";
                playerTurn = 1;
            }, 3000)
        }
        else if(result == 3){
            document.querySelector(".resultText").innerHTML = "It's a draw!";
            setTimeout(() => {
                gameBoard.resetBoard();
                gameResult = 0;
                document.querySelector(".resultText").innerHTML = "";
                playerTurn = 1;
            }, 3000)
        }
    }

    initOnClick();
    return {
        getPlayerTurn
    }
})();

