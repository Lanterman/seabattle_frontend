import React from "react";
import { RouterProvider } from "react-router-dom";
import axios from "axios";

import router from "./router/Router";


function App(props) {

    axios.defaults.baseURL = window.env.BASE_URL;

    return (
        <RouterProvider router={router} />
    );
};

export { App };
