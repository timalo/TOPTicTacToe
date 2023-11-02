/*
    Gameboard: just one instance, so this is done using a module. 
    DisplayController or something similar could also be ddone using a module.

    Player object has several instances. Most likely two. These are done using factory functions.
*/

let gameBoard = (function(){
    let gameBoardArray = new Array(9);
    for (let i = 0; i < gameBoardArray.length; i++){
        console.log("initializing slot n:o " + i);
        gameBoardArray[i] = " ";
    }
    return gameBoardArray;
})();

let Player = function (name) {
    let player = {};
    player.name = name;
    return player;
}

