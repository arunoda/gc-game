const GameRenderer = require("../views/GameRenderer")
const BoardView = require("../models/BoardView")
const BoardItem = require("../models/BoardItem")
const readlineSync = require('readline-sync');

module.exports = class GameController {
    #board;
    #players;
    #currentPlayer;
    #gameRenderer;

    constructor(board, player1, player2) {
        this.#gameRenderer = new GameRenderer(new BoardView(board), player1, player2);
        this.#board = board;
        this.#players = [player1, player2];
        
        this.#currentPlayer = 0;
    }
    
    start() {
        this.#gameRenderer.render();

        while(true) {
            this.#gameRenderer.setCurrentPlayer(0);
            // Check whether we can have more cols exists
            // If not, just say game is draw
            let hasPlayableCols = false;
            for (let colId = 0; colId < this.#board.numCols; colId++) {
                const itemCount = this.#board.getColCount(colId);
                if (itemCount < this.#board.numRows) {
                    hasPlayableCols = true;
                    break;
                }
            }

            if (!hasPlayableCols) {
                console.log("");
                console.log("RESULT: It's a draw. Try again!")
                return;
            }

            // Then check whether the current player is a human
            const player = this.#players[this.#currentPlayer];
            let inputCol = 0;
            if (player.isHuman) {
                // If so, prompt & get the answer
                console.log();
                console.log(`Human player "${player.id}" is playing...`)
                const strValue = readlineSync.question("Enter your selected columnId: ");
                const intValue = parseInt(strValue, 10);

                inputCol = intValue;
            } else {
                // If not call the method & get the answer
                console.log(`Robot player "${player.id}" is playing...`)
                readlineSync.question("Press Enter to continue:");
                inputCol = player.playMove(new BoardView(this.#board));
            }

            // Check whether that's a valid col
            if ((inputCol != 0 && !inputCol) || inputCol < 0 || inputCol >= this.#board.numCols) {
                this.#gameRenderer.setError(`Enter a valid column id. (it starts from 0 to ${this.#board.numCols - 1})`);
                this.#gameRenderer.render();
                continue;
            }
            
            // Check whether that col can be playable
            const itemCount = this.#board.getColCount(inputCol);
            if (itemCount >= this.#board.numRows) {
                this.#gameRenderer.setError(`The column(${inputCol}) is not playable. Select another column`)
                this.#gameRenderer.render();
                continue;
            }

            // Add the item to the board
            this.#board.addItem(inputCol, new BoardItem(player.id))

            // TODO: Check whether there is a winning chance
            // If wins, show a message & end the game
            // If not, change the player & start

            // Change the current player
            this.#currentPlayer = this.#currentPlayer + 1;
            if (this.#currentPlayer >= this.#players.length) {
                this.#currentPlayer = 0;
            }
            this.#gameRenderer.setCurrentPlayer(this.#currentPlayer);

            this.#gameRenderer.setError(null);
            this.#gameRenderer.setInfo(null);
            this.#gameRenderer.render();
        }

    }
}