const defaultState = {
    myBoard: null, enemyBoard: null, currentShip: null, isCanPutShip: true, areUsersReady: false,
};

const WRITE_STATE = "WRITE_STATE";
const SET_MY_BOARD = "SET_MY_BOARD";
const SET_ENEMY_BOARD = "SET_ENEMY_BOARD";
const SET_CURRENT_SHIP = "SET_CURRENT_SHIP";
const SET_IS_CAN_PUT_SHIP = "SET_IS_CAN_PUT_SHIP";
const SET_ARE_USERS_READY = "SET_ARE_USERS_READY";

export const lobbyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case WRITE_STATE:
            return {
                ...state,
                myBoard: action.payload.myBoard, 
                enemyBoard: action.payload.enemyBoard, 
                ships: action.payload.ships,
            };
        case SET_MY_BOARD:
            return {...state, myBoard: action.payload};
        case SET_ENEMY_BOARD:
            return {...state, enemyBoard: action.payload};
        case SET_CURRENT_SHIP:
            return {...state, currentShip: action.payload};
        case SET_IS_CAN_PUT_SHIP:
            return {...state, isCanPutShip: action.payload};
        case SET_ARE_USERS_READY:
            return {...state, areUsersReady: action.payload};
        default: 
            return state;
    }
};


export const defineLobbyStateAction = (payload) => ({type: WRITE_STATE, payload});
export const setEnemyBoard = (payload) => ({type: SET_ENEMY_BOARD, payload});
export const setMyBoard = (payload) => ({type: SET_MY_BOARD, payload});
export const setCurrentShip = (payload) => ({type: SET_CURRENT_SHIP, payload});
export const setIsCanPutShip = (payload) => ({type: SET_IS_CAN_PUT_SHIP, payload});
export const setAreUsersReady = (payload) => ({type: SET_ARE_USERS_READY, payload});
