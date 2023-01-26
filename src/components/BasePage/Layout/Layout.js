import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Advertising from "../Advertising/Advertising";
import Aside from "../Aside/Aside";

function Layout(props) {

    return (
        <div className="app">
            <Header />
            <Advertising />
            <Aside />

            <Outlet/>
        </div>
    );
};

export default Layout;