const defaultState = {
    myBoard: null, enemyBoard: null, currentShip: null, isCanPutShip: true, winner: null, bet: null, timeLeft: null, 
    timeToMove: null, isPlayWithABot: null, users: null, messages: null, lobbyId: null,
};

const PRELOAD = "PRELOAD";
const CLEAR_STATE = "CLEAR_STATE";
const SET_WINNER = "SET_WINNER";
const ADD_MESSAGE = "ADD_MESSAGE";
const SET_MY_BOARD = "SET_MY_BOARD";
const SET_TIME_LEFT = "SET_TIME_LEFT";
const SET_ENEMY_BOARD = "SET_ENEMY_BOARD";
const SET_CURRENT_SHIP = "SET_CURRENT_SHIP";
const ADD_USER_TO_LOBBY = "ADD_USER_TO_LOBBY";
const SET_IS_CAN_PUT_SHIP = "SET_IS_CAN_PUT_SHIP";
const UPDATE_ANSWER_TO_BOARDS = "UPDATE_ANSWER_TO_BOARDS";

export const lobbyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRELOAD:
            return {
                ...state,
                lobbyId: action.payload.lobbyId,
                bet: action.payload.bet,
                timeLeft: action.payload.timeLeft,
                timeToMove: action.payload.timeToMove,
                winner: action.payload.winner,
                myBoard: action.payload.myBoard, 
                enemyBoard: action.payload.enemyBoard,
                isPlayWithABot: action.payload.is_play_with_a_bot,
                users: action.payload.users,
                messages: action.payload.messages,
            };
        case CLEAR_STATE:
            return defaultState;
        case SET_WINNER:
            return {...state, winner: action.payload};
        case ADD_MESSAGE:
            return {...state, messages: action.payload};
        case SET_MY_BOARD:
            return {...state, myBoard: action.payload};
        case SET_ENEMY_BOARD:
            return {...state, enemyBoard: action.payload};
        case SET_TIME_LEFT:
            return {...state, timeLeft: action.payload};
        case SET_CURRENT_SHIP:
            return {...state, currentShip: action.payload};
        case ADD_USER_TO_LOBBY:
            return {...state, users: action.payload};
        case SET_IS_CAN_PUT_SHIP:
            return {...state, isCanPutShip: action.payload};
        case UPDATE_ANSWER_TO_BOARDS:
            return {...state, myBoard: action.payload.myBoard, enemyBoard: action.payload.enemyBoard}
        default: 
            return state;
    }
};


export const defineLobbyStateAction = (payload) => ({type: PRELOAD, payload});
export const clearState = () => ({type: CLEAR_STATE});
export const setWinner = (payload) => ({type: SET_WINNER, payload});
export const addMessage = (payload) => ({type: ADD_MESSAGE, payload});
export const setMyBoard = (payload) => ({type: SET_MY_BOARD, payload});
export const setTimeLeft = (payload) => ({type: SET_TIME_LEFT, payload});
export const setEnemyBoard = (payload) => ({type: SET_ENEMY_BOARD, payload});
export const setCurrentShip = (payload) => ({type: SET_CURRENT_SHIP, payload});
export const addUserToLobby = (payload) => ({type: ADD_USER_TO_LOBBY, payload});
export const setIsCanPutShip = (payload) => ({type: SET_IS_CAN_PUT_SHIP, payload});
export const updateAnswerToBoards = (payload) =>({type: UPDATE_ANSWER_TO_BOARDS, payload});
