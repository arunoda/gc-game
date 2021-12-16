//import Board from './lib/models/Board.js'
const readline = require("readline");

// const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("", function(name) {
    console.log(`Hello ${name}`);
    process.exit(0);
});

// rl.on("close", function() {
//     console.log("\nBYE BYE !!!");
//     process.exit(0);
// });