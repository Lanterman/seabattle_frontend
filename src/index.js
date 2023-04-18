import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App";
import { store } from "./store/store";

const rootElement = (
    <Provider store={store}>
        <App />
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(rootElement);
