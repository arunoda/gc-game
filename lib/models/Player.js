module.exports = class Player {
    id
    symbol
    isHuman

    constructor() {
        this.id = "pid";
        this.symbol = "+";
        this.isHuman = true;
    }

    playMove(boardView) {
        throw new Error("Not Implemented")
    }
};