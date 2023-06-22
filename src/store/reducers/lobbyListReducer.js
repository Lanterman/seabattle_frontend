const defaultState = {
    lobbyList: null,
    name: "", 
    betMax: "", 
    betMin: "", 
    timeToMoveMax: "", 
    timeToMoveMin: "", 
    timeToPlacementMax: "",
    timeToPlacementMin: "", 
    isPrivate: "both",
    search: "",
};

const SET_LOBBY_LIST = "SET_LOBBY_LIST";
const SET_NAME ="SET_NAME";
const SET_BET_MAX = "SET_BET_MAX";
const SET_BET_MIN = "SET_BET_MIN";
const SET_TIME_TO_MOVE_MAX = "SET_TIME_TO_MOVE_MAX";
const SET_TIME_TO_MOVE_MIN = "SET_TIME_TO_MOVE_MIN";
const SET_TIME_TO_PLACEMENT_MAX = "SET_TIME_TO_PLACEMENT_MAX";
const SET_TIME_TO_PLACEMENT_MIN = "SET_TIME_TO_PLACEMENT_MIN";
const SET_IS_PRIVATE = "SET_IS_PRIVATE";
const SET_SEARCH = "SET_SEARCH";

export const lobbyListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_LOBBY_LIST:
            return {...state, lobbyList: action.payload}
        case SET_NAME:
            return {...state, name: action.payload};
        case SET_BET_MAX:
            return {...state, betMax: action.payload};
        case SET_BET_MIN:
            return {...state, betMin: action.payload};
        case SET_TIME_TO_MOVE_MAX:
            return {...state, timeToMoveMax: action.payload};
        case SET_TIME_TO_MOVE_MIN:
            return {...state, timeToMoveMin: action.payload};
        case SET_TIME_TO_PLACEMENT_MAX:
            return {...state, timeToPlacementMax: action.payload};
        case SET_TIME_TO_PLACEMENT_MIN:
            return {...state, timeToPlacementMin: action.payload};
        case SET_IS_PRIVATE:
            return {...state, isPrivate: action.payload};
        case SET_SEARCH:
            return {...state, search: action.payload};
        default: 
            return state;
    };
};


export const setLobbyList = (payload) => ({type: SET_LOBBY_LIST, payload});
export const setNameAction = (payload) => ({type: SET_NAME, payload});
export const setBetMaxAction = (payload) => ({type: SET_BET_MAX, payload});
export const setBetMinAction = (payload) => ({type: SET_BET_MIN, payload});
export const setTimeToMoveMaxAction = (payload) => ({type: SET_TIME_TO_MOVE_MAX, payload});
export const setTimeToMoveMinAction = (payload) => ({type: SET_TIME_TO_MOVE_MIN, payload});
export const setTimeToPlacementMaxAction = (payload) => ({type: SET_TIME_TO_PLACEMENT_MAX, payload});
export const setTimeToPlacementMinAction = (payload) => ({type: SET_TIME_TO_PLACEMENT_MIN, payload});
export const setIsPrivateAction = (payload) => ({type: SET_IS_PRIVATE, payload});
export const setSearch = (payload) => ({type: SET_SEARCH, payload});