const defaultState = {cash: 0, lobby: null}

const ADD_CASH ="ADD_CASH";
const GET_CASH = "GET_CASH";
const ADD_LOBBY = "ADD_LOBBY";

const lobbyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_LOBBY:
            return {...state, lobby: action.payload}
        case ADD_CASH:
            return {...state, cash: state.cash + action.payload}
        case GET_CASH:
            return {...state, cash: state.cash - action.payload}
        default: 
            return state
    }
};


const addCashAction = (payload) => ({type: ADD_CASH, payload});
const addLobbyAction = (payload) => ({type: ADD_LOBBY, payload});
const removeCashAction = (payload) => ({type: GET_CASH, payload});

export { lobbyReducer, addCashAction, addLobbyAction, removeCashAction }