import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

import { sendDetermineWinner } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";

import "./Header.css";


function Header(props) {
    const params = useParams();
    const location = useLocation();
    const winner = useSelector(state => state.lobby.winner);
    const enemyId = useSelector(state => state.lobby.enemyBoard?.user_id);
    
    function onClickHandler(e) {
        if (location.pathname.length >= 45 & !winner) {
            if (window.confirm("Do you really want to follow the link? \nIt will count as a loss!")) {
                sendDetermineWinner(props.client, params.slug, enemyId);
                props.client.close();
            } else {
                e.preventDefault();
            };
        };
        winner && props.client.close();
    };

    return (
        <header className="header-app">
            <nav className="navLinks">
                <FontAwesomeIcon icon={faShip} className="app-icon"/>
                <NavLink to="/" className="navLink" onClick={(e) => onClickHandler(e)}>Profile</NavLink>
                <NavLink to="/lobbies" className="navLink" onClick={(e) => onClickHandler(e)}>Lobbies</NavLink>
                <NavLink to="/leadboard" className="navLink" onClick={(e) => onClickHandler(e)}>Leadboard</NavLink>
                <NavLink to="/about" className="navLink" onClick={(e) => onClickHandler(e)}>About</NavLink>
            </nav>
            <div className="aside-header">
                <Link to="/" onClick={(e) => onClickHandler(e)}>v0.1.0</Link>
                <Link to="/" onClick={(e) => onClickHandler(e)}>GitHub</Link>
            </div>
        </header>
    );
};  

export default Header;