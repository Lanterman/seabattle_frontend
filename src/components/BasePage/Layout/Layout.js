import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Advertising from "../Advertising/Advertising";
import Aside from "../Aside/Aside";

function Layout(props) {
    let client = null;
    // console.log("На главном вебсокете сделть проверку завершенных игр, если есть не завершенная, предложить догирать")
    return (
        <div className="app">
            <Header client={client} />
            <Advertising />
            <Aside />
            <Outlet context={{client: client}}/>
        </div>
    );
};

export default Layout;