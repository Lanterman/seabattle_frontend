import React from "react";
import { RouterProvider } from "react-router-dom";

import router from "./router/Router";


function App(props) {

    return (
        <RouterProvider router={router} />
    );
};

export { App };
