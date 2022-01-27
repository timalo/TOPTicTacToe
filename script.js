const gameBoard = (() => {
    let board = new Array(9);
    return {board};
})();

const playerFactory = (name) => {
    let points = 0;
    const getName = () => console.log(name);
    const getPoints = () => points;
    return {getName, getPoints};
};


const gameController = () => {

}