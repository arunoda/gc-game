const { it, describe, expect, fail } = require("@jest/globals");
const HumanPlayer = require("../../lib/models/HumanPlayer");
const DumbPlayer = require("../../lib/models/DumbPlayer");
const Board = require("../../lib/models/Board.js")
const BoardItem = require("../../lib/models/BoardItem");
const BoardView = require("../../lib/models/BoardView");

describe("Players", () => {
    describe("HumanPlayer", () => {
        it("should expose id & the symbol", () => {
            const hp = new HumanPlayer("hh", "+");
            expect(hp.id).toBe("hh");
            expect(hp.symbol).toBe("+");
        });

        it("should expose this is a human player", () => {
            const hp = new HumanPlayer("hh", "+");
            expect(hp.isHuman).toBe(true);
        });

        it("should throw when calling playMove", () => {
            const hp = new HumanPlayer("hh", "+");
            try {
                hp.playMove();
                fail("We cannot see this")
            } catch(err) {
                expect(err.message).toBe("Not Implemented")
            }
        });
    });

    describe("DumbPlayer", () => {
        it("should expose id & the symbol", () => {
            const hp = new DumbPlayer("dd", "-");
            expect(hp.id).toBe("dd");
            expect(hp.symbol).toBe("-");
        });

        it("should expose this is not a human player", () => {
            const dp = new DumbPlayer("dd", "-");
            expect(dp.isHuman).toBe(false);
        });

        describe("playMove", () => {
            it("should give the first colId when there's no moves", () => {
                const b = new Board(7, 6);
                const dp = new DumbPlayer("dd", "-");
                const colId = dp.playMove(new BoardView(b))
                expect(colId).toBe(0);
            });

            it("should try to fill colums from start", () => {
                const b = new Board(7, 6);
                const dp = new DumbPlayer("dd", "-");

                for (var lc=0; lc<5; lc++) {
                    b.addItem(0, new BoardItem(dp.id))
                }

                const colId = dp.playMove(new BoardView(b))
                expect(colId).toBe(0);
            });

            it("should ignore filled cols", () => {
                const b = new Board(7, 6);
                const dp = new DumbPlayer("dd", "-");

                for (var lc=0; lc<6; lc++) {
                    b.addItem(0, new BoardItem(dp.id))
                }

                const colId = dp.playMove(new BoardView(b))
                expect(colId).toBe(1);
            });
        });

    })
});