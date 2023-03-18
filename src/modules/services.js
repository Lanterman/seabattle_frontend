export const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export let timer = {
    _countdownHasStarted: false,
    _timeIsOver: false,

    get countdownHasStarted() {
        return this._countdownHasStarted;
    },

    set countdownHasStarted(value) {
        this._countdownHasStarted = value;
    },

    get timeIsOver() {
        return this._timeIsOverl
    },

    set timeIsOver(value) {
        this._timeIsOver = value;
    }
};

export function createBoardVariable(board) {
    const columnBoard = {};
    columnNameList.map((columnName) => (
        columnBoard[columnName] = board[columnName]
    ));
    return columnBoard;
};