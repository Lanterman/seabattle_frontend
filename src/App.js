import React from "react";
import { RouterProvider } from "react-router-dom";
import axios from "axios";

import router from "./router/Router";

// const request = axios.create({baseURL: "http://127.0.0.1:8000/api/v1/"});

function App(props) {

    axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";
    

    return (
        <RouterProvider router={router} />
    );
};

export { App };
