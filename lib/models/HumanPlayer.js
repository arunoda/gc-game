const Player = require('./Player');

module.exports = class HumanPlayer extends Player {
    constructor(id, symbol) {
        super();
        this.isHuman = true;
        this.id = id;
        this.symbol = symbol;
    }
};