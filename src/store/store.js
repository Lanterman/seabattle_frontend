import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { lobbyReducer } from "./reducers/lobbyReducer";
import { lobbyListReducer } from "./reducers/lobbyListReducer";
import { profileReducer } from "./reducers/profileReducer";


const rootReducer = combineReducers({
    lobby: lobbyReducer, 
    lobbyList: lobbyListReducer, 
    profile: profileReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };