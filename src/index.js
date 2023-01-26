import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import App from "./App";


const rootElement = (
    <StrictMode>
        <App />
    </StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(rootElement);
