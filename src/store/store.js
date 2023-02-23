import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { baseReducer } from "./reducers/baseReducer";
import { lobbyReducer } from "./reducers/lobbyReducer";


const rootReducer = combineReducers({lobby: lobbyReducer, base: baseReducer});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };