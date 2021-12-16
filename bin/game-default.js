const Board = require("../lib/models/Board")

const HumanPlayer = require("../lib/models/HumanPlayer")
const DumbPlayer = require("../lib/models/DumbPlayer")

const GameController = require("../lib/controllers/GameController")

// -------------------------------------------------------------

const board = new Board(7, 6);
const human = new HumanPlayer("arunoda", "+");
const robot = new DumbPlayer("robot", "-");

const gameController = new GameController(board, human, robot, 4);
gameController.start();