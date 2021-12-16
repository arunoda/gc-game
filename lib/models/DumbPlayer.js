const Player = require('./Player');

module.exports = class DumbPlayer extends Player {
    constructor(id, symbol) {
        super();
        this.isHuman = false;
        this.id = id;
        this.symbol = symbol;
    }

    playMove(boardView) {
        for (var colId = 0; colId < boardView.numCols; colId++) {
            const count = boardView.getColCount(colId);
            if (count < boardView.numRows) {
                return colId;
            }
        }

        throw new Error("There is no possible move!")
    }
};