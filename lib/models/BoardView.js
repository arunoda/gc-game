// This is a proxy class for the Board
// Here we will only expose readonly methods
// (We do this since we use JavaScript otherwise we could interfaces instead)
module.exports = class BoardView {
    #board;
    numCols;
    numRows;

    constructor(board) {
        this.#board = board;
        this.numCols = board.numCols;
        this.numRows = board.numRows;
    }

    getItem(colId, rowId) {
        return this.#board.getItem(colId, rowId);
    }

    getColCount(colId) {
        return this.#board.getColCount(colId);
    }
};