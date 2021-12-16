const Board = require("./lib/models/Board")
const BoardItem = require("./lib/models/BoardItem")
const BoardView = require("./lib/models/BoardView")

const HumanPlayer = require("./lib/models/HumanPlayer")
const DumbPlayer = require("./lib/models/DumbPlayer")

const GameRenderer = require("./lib/views/GameRenderer")

const GameController = require("./lib/controllers/GameController")

// -----

const board = new Board(2, 3);
const human = new HumanPlayer("arunoda", "+");
const robot = new DumbPlayer("robot", "-");

const gameController = new GameController(board, human, robot);
gameController.start();

// // ----------

// const board = new Board(7, 6);
// const human = new HumanPlayer("arunoda", "+");
// const robot = new DumbPlayer("robot", "-");

// board.addItem(0, new BoardItem(human.id))
// board.addItem(0, new BoardItem(human.id))
// board.addItem(0, new BoardItem(robot.id))

// board.addItem(1, new BoardItem(robot.id))
// board.addItem(1, new BoardItem(robot.id))

// const renderer = new GameRenderer(new BoardView(board), human, robot);
// renderer.setError("This is an error")
// renderer.setInfo("This is a info")
// renderer.render();


// // -------------

// //import Board from './lib/models/Board.js'
// const readline = require("readline");

// // const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("", function(name) {
//     console.log(`Hello ${name}`);
//     process.exit(0);
// });

// // rl.on("close", function() {
// //     console.log("\nBYE BYE !!!");
// //     process.exit(0);
// // });