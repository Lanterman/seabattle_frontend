import React from "react";
import { Link, Outlet } from "react-router-dom";


class AboutMePage extends React.Component {

    render() {
        return (
            <div className="main-page">
                <h1>AboutMePage</h1>
                <p><Link to="contacts">My contacts</Link></p>
                <p><Link to="team">My team</Link></p>

                <Outlet />
            </div>
        );
    };
};

export default AboutMePage;
