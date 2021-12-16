const Board = require("../lib/models/Board")

const DumbPlayer = require("../lib/models/DumbPlayer")

const GameController = require("../lib/controllers/GameController")

// -------------------------------------------------------------

const board = new Board(3, 3);
const robot1 = new DumbPlayer("jarvis", "X");
const robot2 = new DumbPlayer("ultron", "0");

const gameController = new GameController(board, robot1, robot2, 3);
gameController.start();