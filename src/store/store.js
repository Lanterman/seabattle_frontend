import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { lobbyReducer } from "./reducers/lobbyReducer";


const rootReducer = combineReducers({lobby: lobbyReducer});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };