import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip } from '@fortawesome/free-solid-svg-icons'

import "./Header.css"


function Header(props) {

    return (
        <header className="header-app">
            <nav className="navLinks">
                <FontAwesomeIcon icon={faShip} className="app-icon"/>
                <NavLink to="/" className="navLink">Profile</NavLink>
                <NavLink to="/lobbies" className="navLink">Lobbies</NavLink>
                <NavLink to="/leadboard" className="navLink">Leadboard</NavLink>
                <NavLink to="/about" className="navLink">About</NavLink>
            </nav>
            <div className="aside-header">
                <Link>v0.1.0</Link>
                <Link>GitHub</Link>
            </div>
        </header>
    );
};  

export default Header;