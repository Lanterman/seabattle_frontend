const defaultState = {
    isReady: false, 
};

const SET_IS_READY = "SET_IS_READY";

export const baseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_READY:
            return {...state, isReady: action.payload};
        default: 
            return state;
    }
};

export const setIsReady = (payload) => ({type: SET_IS_READY, payload});
