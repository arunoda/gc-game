const Board = require("../lib/models/Board")

const HumanPlayer = require("../lib/models/HumanPlayer")
const DumbPlayer = require("../lib/models/DumbPlayer")

const GameController = require("../lib/controllers/GameController")

// -------------------------------------------------------------

const board = new Board(3, 3);
const human = new HumanPlayer("arunoda", "X");
const robot = new DumbPlayer("robot", "0");

const gameController = new GameController(board, human, robot, 3);
gameController.start();