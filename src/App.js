import React from "react";
import { RouterProvider } from "react-router-dom";

import router from "./hooks/Router";


function App(props) {

    return (
        <RouterProvider router={router} />
    );
};

export default App;
