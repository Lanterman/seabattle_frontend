import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { lobbyReducer } from "./reducers/lobbyReducer";
import { lobbyListReducer } from "./reducers/lobbyListReducer";


const rootReducer = combineReducers({lobby: lobbyReducer, lobbyList: lobbyListReducer});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };