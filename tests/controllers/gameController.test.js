const Board = require("../../lib/models/Board");
const HumanPlayer = require("../../lib/models/HumanPlayer");
const DumbPlayer = require("../../lib/models/DumbPlayer");
const GameController = require("../../lib/controllers/GameController");
const { describe, expect } = require("@jest/globals");
const BoardItem = require("../../lib/models/BoardItem");

describe("GameController", () => {
    describe("isWinningMove", () => {
        it ("should win for valid diagonal left", () => {
            const board = new Board(3, 3);
            const human = new HumanPlayer("arunoda", "+");
            const robot = new DumbPlayer("robot", "-");
            const gc = new GameController(board, human, robot, 2);

            board.addItem(0, new BoardItem(human.id));
            board.addItem(1, new BoardItem(robot.id));
            board.addItem(1, new BoardItem(human.id));

            const hasWin = gc.isWinningMove(1, 1);
            expect(hasWin).toBe(true);
        })

        it ("should win for valid diagonal right", () => {
            const board = new Board(3, 3);
            const human = new HumanPlayer("arunoda", "+");
            const robot = new DumbPlayer("robot", "-");
            const gc = new GameController(board, human, robot, 2);

            board.addItem(2, new BoardItem(human.id));
            board.addItem(1, new BoardItem(human.id));
            board.addItem(1, new BoardItem(human.id));

            const hasWin = gc.isWinningMove(1, 1);
            expect(hasWin).toBe(true);
        })

        it ("should win even checked from a lower row", () => {
            const board = new Board(3, 3);
            const human = new HumanPlayer("arunoda", "+");
            const robot = new DumbPlayer("robot", "-");
            const gc = new GameController(board, human, robot, 2);

            board.addItem(0, new BoardItem(robot.id));
            board.addItem(0, new BoardItem(human.id));
            board.addItem(1, new BoardItem(human.id));

            const hasWin = gc.isWinningMove(1, 0);
            expect(hasWin).toBe(true);
        })

        it ("should fail if players are different in diagonal", () => {
            const board = new Board(3, 3);
            const human = new HumanPlayer("arunoda", "+");
            const robot = new DumbPlayer("robot", "-");
            const gc = new GameController(board, human, robot, 2);

            board.addItem(2, new BoardItem(robot.id));
            board.addItem(1, new BoardItem(human.id));
            board.addItem(1, new BoardItem(human.id));

            const hasWin = gc.isWinningMove(1, 1);
            expect(hasWin).toBe(false);
        })

        it ("should fail if there are empty items in the middle", () => {
            const board = new Board(3, 3);
            const human = new HumanPlayer("arunoda", "+");
            const robot = new DumbPlayer("robot", "-");
            const gc = new GameController(board, human, robot, 2);

            board.addItem(0, new BoardItem(human.id));
            board.addItem(0, new BoardItem(human.id));
            board.addItem(0, new BoardItem(human.id));

            board.addItem(2, new BoardItem(human.id));

            const hasWin = gc.isWinningMove(2, 0);
            expect(hasWin).toBe(false);
        })
    })

    describe("validColIds", () => {
        it('should give all if no items in the board', () => {
            const board = new Board(3, 3);
            const human = new HumanPlayer("arunoda", "+");
            const robot = new DumbPlayer("robot", "-");
            const gc = new GameController(board, human, robot, 2);

            expect(gc.getValidColIds()).toEqual([0, 1, 2]);
        });

        it('should give ignore filled cols', () => {
            const board = new Board(3, 3);
            const human = new HumanPlayer("arunoda", "+");
            const robot = new DumbPlayer("robot", "-");
            const gc = new GameController(board, human, robot, 2);

            board.addItem(0, new BoardItem(human.id));
            board.addItem(1, new BoardItem(human.id));
            board.addItem(1, new BoardItem(human.id));
            board.addItem(1, new BoardItem(human.id));

            expect(gc.getValidColIds()).toEqual([0, 2]);
        });
    })
})