const { expect, it } = require("@jest/globals");
const { fail } = require("yargs");
const Board = require("../../lib/models/Board.js")
const BoardItem = require("../../lib/models/BoardItem");

describe("Board", () => {
    it ('should show correct col & row counts', () => {
        const b = new Board(10, 20);
        expect(b.numCols).toBe(10);
        expect(b.numRows).toBe(20);
    });

    it ('should should allow to add items', () => {
        const b = new Board(10, 20);
        b.addItem(3, new BoardItem("p1"));
        expect(b.getItem(3, 0).playerId).toBe("p1");
    });

    it ('should should show the correct colCount', () => {
        const b = new Board(10, 20);
        b.addItem(3, new BoardItem("p1"));
        b.addItem(3, new BoardItem("p2"));
        expect(b.getColCount(3)).toBe(2);
        expect(b.getColCount(0)).toBe(0);
    });

    it ('should throw when trying to access a wrong colId', () => {
        const b = new Board(10, 20);
        try {
            b.getItem(100, 10);
            fail("we cannot see this")
        } catch(err) {
            expect(err.message).toContain("Invalid colId")
        }
    });

    it ('should throw when trying to access a wrong rowId', () => {
        const b = new Board(10, 20);
        try {
            b.getItem(5, 0);
            fail("we cannot see this")
        } catch(err) {
            expect(err.message).toContain("Invalid rowId")
        }
    })
});