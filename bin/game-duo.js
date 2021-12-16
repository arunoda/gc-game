const Board = require("../lib/models/Board")

const HumanPlayer = require("../lib/models/HumanPlayer")

const GameController = require("../lib/controllers/GameController")

// -------------------------------------------------------------

const board = new Board(3, 3);
const human1 = new HumanPlayer("arunoda", "X");
const human2 = new HumanPlayer("jhon", "0");

const gameController = new GameController(board, human1, human2, 3);
gameController.start();