import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Advertising from "../Advertising/Advertising";
import Aside from "../Aside/Aside";

function Layout(props) {
    const [client, setClient] = useState(null);
    // console.log("На главном вебсокете сделть проверку завершенных игр, если есть не завершенная, предложить догирать")
    return (
        <div className="app">
            <Header client={client} setClient={setClient}/>
            <Advertising />
            <Aside />
            <Outlet context={{setClient: setClient}}/>
        </div>
    );
};

export default Layout;