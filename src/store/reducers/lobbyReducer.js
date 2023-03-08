const defaultState = {
    myBoard: null, enemyBoard: null, currentShip: null, isCanPutShip: true, winner: null,
};

const PRELOAD = "PRELOAD";
const SET_WINNER = "SET_WINNER";
const SET_MY_BOARD = "SET_MY_BOARD";
const SET_ENEMY_BOARD = "SET_ENEMY_BOARD";
const SET_CURRENT_SHIP = "SET_CURRENT_SHIP";
const SET_IS_CAN_PUT_SHIP = "SET_IS_CAN_PUT_SHIP";

export const lobbyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRELOAD:
            return {
                ...state,
                winner: action.payload.winner,
                myBoard: action.payload.myBoard, 
                enemyBoard: action.payload.enemyBoard, 
                ships: action.payload.ships,
            };
        case SET_WINNER:
            return {...state, winner: action.payload};
        case SET_MY_BOARD:
            return {...state, myBoard: action.payload};
        case SET_ENEMY_BOARD:
            return {...state, enemyBoard: action.payload};
        case SET_CURRENT_SHIP:
            return {...state, currentShip: action.payload};
        case SET_IS_CAN_PUT_SHIP:
            return {...state, isCanPutShip: action.payload};
        default: 
            return state;
    }
};


export const defineLobbyStateAction = (payload) => ({type: PRELOAD, payload});
export const setWinner = (payload) => ({type: SET_WINNER, payload});
export const setMyBoard = (payload) => ({type: SET_MY_BOARD, payload});
export const setEnemyBoard = (payload) => ({type: SET_ENEMY_BOARD, payload});
export const setCurrentShip = (payload) => ({type: SET_CURRENT_SHIP, payload});
export const setIsCanPutShip = (payload) => ({type: SET_IS_CAN_PUT_SHIP, payload});
