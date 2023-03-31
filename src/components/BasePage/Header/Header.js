import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";

import { sendDetermineWinner, sendCountDownTimer } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { clearState } from "../../../store/reducers/lobbyReducer";

import "./Header.css";


function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const winner = useSelector(state => state.lobby.winner);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const users = useSelector(state => state.lobby.users);

    function beforeClosingPage(url) {
        props.client.close();
        props.setClient(null);
        dispatch(clearState());
        navigate(url);
    };
    
    function onClickHandler(e, url) {
        e.preventDefault();
        if (location.pathname.length >= 45 && users.length === 2) {
            if (!winner) {
                if (window.confirm("Do you really want to follow the link? \nIt will count as a loss!")) {
                    sendDetermineWinner(props.client, enemyBoard.user_id);
                    beforeClosingPage(url);
                } else {
                    sendCountDownTimer(props.client);
                };
            } else {
                beforeClosingPage(url);
            };
        } else {
            navigate(url);
        };
    };

    return (
        <header className="header-app">
            <nav className="navLinks">
                <FontAwesomeIcon icon={faShip} className="app-icon"/>
                <NavLink to="/" className="navLink" onClick={(e) => onClickHandler(e, "/")}>Profile</NavLink>
                <NavLink to="/lobbies" className="navLink" onClick={(e) => onClickHandler(e, "/lobbies/")}>Lobbies</NavLink>
                <NavLink to="/leadboard" className="navLink" onClick={(e) => onClickHandler(e, "/leadboard/")}>Leadboard</NavLink>
                <NavLink to="/about" className="navLink" onClick={(e) => onClickHandler(e, "/about/")}>About</NavLink>
            </nav>
            <div className="aside-header">
                <Link to="/" onClick={(e) => onClickHandler(e, "/")}>v0.1.0</Link>
                <Link to="/" onClick={(e) => onClickHandler(e, "/")}>GitHub</Link>
            </div>
        </header>
    );
};  

export default Header;