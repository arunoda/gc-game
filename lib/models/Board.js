module.exports =  class Board {
    numCols = 0;
    numRows = 0;
    #cols = [];

    constructor(numCols, numRows) {
        this.numCols = numCols;
        this.numRows = numRows;

        for (var lc=0; lc<numCols; lc++) {
            this.#cols.push([]);
        }
    }

    getCol(colId) {
        if (colId >= this.#cols.length || colId < 0) {
            throw new Error(`Invalid colId of ${colId}`);
        }

        return this.#cols[colId];
    }

    getItem(colId, rowId) {
        const col = this.getCol(colId);

        if (rowId >= col.length || rowId < 0) {
            throw new Error(`Invalid rowId of ${rowId}`);
        }

        return col[rowId];
    }

    getColCount(colId) {
        const col = this.getCol(colId);
        return col.length;
    }

    addItem(colId, item) {
        const col = this.getCol(colId);
        col.push(item);
    }
}