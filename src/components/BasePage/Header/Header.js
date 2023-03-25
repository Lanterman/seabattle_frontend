import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";

import { sendDetermineWinner, sendCountDownTimer } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { clearState } from "../../../store/reducers/lobbyReducer";

import "./Header.css";


function Header(props) {
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const winner = useSelector(state => state.lobby.winner);
    const timeLeft = useSelector(state => state.lobby.timeLeft);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const typeAction = myBoard?.is_ready & enemyBoard?.is_ready ? "turn" : "placement";

    function beforeClosingPage(e) {
        props.client.close();
        props.setClient(null);
        dispatch(clearState());
    };
    
    function onClickHandler(e) {
        if (location.pathname.length >= 45) {
            if (!winner) {
                if (window.confirm("Do you really want to follow the link? \nIt will count as a loss!")) {
                    sendDetermineWinner(props.client, params.slug, enemyBoard.user_id);
                    beforeClosingPage(e);
                } else {
                    e.preventDefault();
                    sendCountDownTimer(props.client, params.slug, timeLeft, typeAction);
                };
            } else {
                beforeClosingPage();
            };
        };
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