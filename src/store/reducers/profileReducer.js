const defaultState = {
    username: "", 
    firstName: "", 
    lastName: "", 
    email: "", 
    mobileNumber: "", 
    cash: "", 
    rating: "",
    createdIn: "", 
    updatedIn: "", 
    photo: "",
    gamesHistory: [],
};

const PRELOAD = "PRELOAD";
const SET_USERNAME ="SET_USERNAME";
const SET_FIRST_NAME = "SET_FIRST_NAME";
const SET_LAST_NAME = "SET_LAST_NAME";
const SET_EMAIL = "SET_EMAIL";
const SET_MOBILE_NUMBER = "SET_MOBILE_NUMBER";
const SET_CASH = "SET_CASH";
const SET_RATING = "SET_RATING";
const SET_CREATED_IN = "SET_CREATED_IN";
const SET_UPDATED_IN = "SET_UPDATED_IN";
const SET_PHOTO = "SET_PHOTO";


export const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case PRELOAD:
            return {
                ...state,
                username: action.payload.username,
                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                email: action.payload.email,
                mobileNumber: action.payload.mobile_number, 
                cash: action.payload.cash,
                rating: action.payload.rating,
                createdIn: action.payload.created_in,
                updatedIn: action.payload.updated_in,
                photo: action.payload.photo,
                gamesHistory: action.payload.lobbies,
            };
        case SET_USERNAME:
            return {...state, username: action.payload};
        case SET_FIRST_NAME:
            return {...state, firstName: action.payload};
        case SET_LAST_NAME:
            return {...state, lastName: action.payload};
        case SET_EMAIL:
            return {...state, email: action.payload};
        case SET_MOBILE_NUMBER:
            return {...state, mobileNumber: action.payload};
        case SET_CASH:
            return {...state, cash: action.payload};
        case SET_RATING:
            return {...state, rating: action.payload};
        case SET_CREATED_IN:
            return {...state, createdIn: action.payload};
        case SET_UPDATED_IN:
            return {...state, updatedIn: action.payload};
        case SET_PHOTO:
            return {...state, photo: action.payload};
        default: 
            return state;
    }
};


export const defineProfileStateAction = (payload) => ({type: PRELOAD, payload});
export const setUsernameAction = (payload) => ({type: SET_USERNAME, payload});
export const setFirstNameAction = (payload) => ({type: SET_FIRST_NAME, payload});
export const setLastNameAction = (payload) => ({type: SET_LAST_NAME, payload});
export const setEmailAction = (payload) => ({type: SET_EMAIL, payload});
export const setMobileNumberAction = (payload) => ({type: SET_MOBILE_NUMBER, payload});
export const setCashAction = (payload) => ({type: SET_CASH, payload});
export const setRatingAction = (payload) => ({type: SET_RATING, payload});
export const setCreatedInAction = (payload) => ({type: SET_CREATED_IN, payload});
export const setUpdatedInAction = (payload) =>({type: SET_UPDATED_IN, payload});
export const setPhotoAction = (payload) =>({type: SET_PHOTO, payload});
