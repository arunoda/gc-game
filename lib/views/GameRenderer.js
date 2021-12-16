module.exports = class GameRenderer {
    #boardView;
    #players;
    #currentPlayer;

    #errorMessage;
    #infoMessage;

    constructor(boardView, player1, player2) {
        this.#boardView = boardView;
        this.#players = [player1, player2];
        this.#currentPlayer = 0;
    }

    setError(errorMessage) {
        this.#errorMessage = errorMessage;
    }

    setInfo(infoMessage) {
        this.#infoMessage = infoMessage;
    }

    setCurrentPlayer(index) {
        this.#currentPlayer = index;
    }

    render() {
        console.log('\n\n')
        console.log("Game: Connect Four");
        console.log("------------------");
        console.log();
        
        // Show player info
        for (let lc = 0; lc< this.#players.length; lc++) {
            const player = this.#players[lc];
            const currentInfo = lc == this.#currentPlayer ? "(current)" : "";
            console.log(`Player${lc+1}: [${player.symbol}] ${player.id} ${currentInfo}`)
        }

        console.log();

        // Show the board
        for (let rowId = this.#boardView.numRows - 1; rowId >= 0; rowId--) {
            let line = "|"

            for (let colId = 0; colId < this.#boardView.numCols; colId++) {
                // Check whether we have some items in this place
                const colItems = this.#boardView.getColCount(colId);
                if (colItems <= rowId) {
                    line += `   |`
                    continue;
                }
    
                const item = this.#boardView.getItem(colId, rowId);
                const symbol = item.playerId == this.#players[0].id ? this.#players[0].symbol : this.#players[1].symbol;
                line += ` ${symbol} |`
            }

            console.log(line);
        }

        console.log();

        if (this.#errorMessage) {
            console.error(`ERROR: ${this.#errorMessage}`)
        }

        if (this.#infoMessage) {
            console.info(`INFO: ${this.#infoMessage}`)
        }
    }
};