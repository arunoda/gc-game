const GameRenderer = require("../views/GameRenderer")
const BoardView = require("../models/BoardView")
const BoardItem = require("../models/BoardItem")
const readlineSync = require('readline-sync');
const { CHAR_0 } = require("picomatch/lib/constants");

module.exports = class GameController {
    #board;
    #players;
    #currentPlayer;
    #gameRenderer;
    #winningCount;

    constructor(board, player1, player2, winningCount=4) {
        this.#gameRenderer = new GameRenderer(new BoardView(board), player1, player2);
        this.#board = board;
        this.#players = [player1, player2];
        
        this.#currentPlayer = 0;
        this.#winningCount = winningCount;
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
                readlineSync.question("******Press Enter to continue*******:");
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
            
            // Check whether there is a winning chance
            // If wins, show a message & end the game
            const hasWon = this.isWinningMove(inputCol, this.#board.getColCount(inputCol) -1);
            if (hasWon) {
                this.#gameRenderer.setError(null);
                this.#gameRenderer.setInfo(null);
                this.#gameRenderer.render();
                console.log("")
                console.log(`There is a winner. That's ${player.id}`)
                return;
            }

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

    isWinningMove(colId, rowId) {
        const currentPlayerId = this.#board.getItem(colId, rowId).playerId;
        const diagonalItemsLeft = [];
        const diagonalItemsRight = [];

        for (let trow=0; trow<this.#board.numRows; trow++) {
            const diff = trow - rowId;
            const tcol = colId - diff;
            
            if (tcol < 0 || tcol >= this.#board.numCols) {
                diagonalItemsLeft.push(null);
                continue;
            }

            const numItems = this.#board.getColCount(tcol);
            if (numItems <= trow) {
                diagonalItemsLeft.push(null);
                continue;
            }

            diagonalItemsLeft.push(this.#board.getItem(tcol, trow))
        }

        for (let trow=0; trow<this.#board.numRows; trow++) {
            const diff = trow - rowId;
            const tcol = colId + diff;
            
            if (tcol < 0 || tcol >= this.#board.numCols) {
                diagonalItemsRight.push(null);
                continue;
            }

            const numItems = this.#board.getColCount(tcol);
            if (numItems <= trow) {
                diagonalItemsRight.push(null);
                continue;
            }

            diagonalItemsRight.push(this.#board.getItem(tcol, trow))
        }
        
        // Check left
        let foundCount = 0;
        for (const item of diagonalItemsLeft) {
            if (!item) {
                foundCount = 0;
                continue;
            }

            if (item.playerId == currentPlayerId) {
                foundCount += 1;
                if (foundCount >= this.#winningCount) {
                    return true;
                }
                continue;
            }

            foundCount = 0;
        }

        // Check Right
        foundCount = 0;
        for (const item of diagonalItemsRight) {
            if (!item) {
                foundCount = 0;
                continue;
            }

            if (item.playerId == currentPlayerId) {
                foundCount += 1;
                if (foundCount >= this.#winningCount) {
                    return true;
                }
                continue;
            }

            foundCount = 0;
        }

        return false;
    }
}