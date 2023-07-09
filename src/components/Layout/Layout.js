import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Advertising from "../Advertising/Advertising";
import Aside from "../Aside/Aside";

function Layout(props) {
    const token = sessionStorage.getItem("auth_token");
    const [client, setClient] = useState(null);
    const mainClient = useMemo(() => {
        return new WebSocket(`${window.env.BASE_URL_WS}/ws/main/?token=${token}`);
    }, [token]);
    // console.log("На главном вебсокете сделть проверку завершенных игр, если есть не завершенная, предложить догирать")
    return (
        <div className="app">
            <Header client={client} setClient={setClient} mainClient={mainClient} />
            <Advertising />
            <Aside />
            <Outlet context={{setClient: setClient, mainClient: mainClient}}/>
        </div>
    );
};

export default Layout;