export const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export let timer = {
    _isCountdownHasStarted: false,
    _isTimeIsOver: false,
    _isAnswered: false,
    _isEnemyConnected: false,

    get isCountdownHasStarted() {
        return this._isCountdownHasStarted;
    },

    set isCountdownHasStarted(value) {
        this._isCountdownHasStarted = value;
    },

    get isTimeIsOver() {
        return this._isTimeIsOver;
    },

    set isTimeIsOver(value) {
        this._isTimeIsOver = value;
    },

    get isAnswered() {
        return this._isAnswered;
    },

    set isAnswered(value) {
        this._isAnswered = value;
    },

    get isEnemyConnected() {
        return this._isEnemyConnected;
    },

    set isEnemyConnected(value) {
        this._isEnemyConnected = value;
    }
};

export function createBoardVariable(board) {
    const columnBoard = {};
    columnNameList.map((columnName) => (
        columnBoard[columnName] = board[columnName]
    ));
    return columnBoard;
};
