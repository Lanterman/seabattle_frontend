export const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export let displayWsResult = {
    _lobbySlug: "",

    get lobbySlug() {
        return this._lobbySlug;
    },

    set lobbySlug(value) {
        this._lobbySlug = value;
    }
};

export let timer = {
    _isCountdownHasStarted: false,
    _isTimeIsOver: false,
    _isAnswered: false,
    _isEnemyConnected: false,
    _isBotIsReady: false,
    _isBotShooted: false,

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
    },

    get isBotIsReady() {
        return this._isBotIsReady;
    },

    set isBotIsReady(value) {
        this._isBotIsReady = value;
    },

    get isBotShooted() {
        return this._isBotShooted
    },

    set isBotShooted(value) {
        this._isBotShooted = value;
    },
};

export function createBoardVariable(board) {
    const columnBoard = {};
    columnNameList.map((columnName) => (
        columnBoard[columnName] = board[columnName]
    ));
    return columnBoard;
};


export class ServerErrorException {
    constructor(message=null) {
        this.message = message ? message : "Internal Server Error";
    };
 };