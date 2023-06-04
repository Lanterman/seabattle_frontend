import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { clearState } from "../../store/reducers/lobbyReducer";
import { LobbyWindow } from "../ModalWindows/LobbyWindow/LobbyWindow";
import { sendDeleteGame, sendPlayAgain } from "../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { sendNotifDeletedGame } from "../../modules/wsCommunication/wsApp/wsMainRequests";

import "./Header.css";


function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lobbyId = useSelector(state => state.lobby.lobbyId);
    const winner = useSelector(state => state.lobby.winner);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const users = useSelector(state => state.lobby.users);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [content, setContent] = useState({});
    const username = sessionStorage.getItem("username");

    function onClickHandler(e, url) {
        e.preventDefault();
        if (window.location.pathname.length >= 45) {
            winner && myBoard.is_play_again === null && sendPlayAgain(props.client, lobbyId, myBoard.id, false);

            if (!winner && users && users.length === 2 && enemyBoard.user_id) {
                setContent(Object.assign({url: url}, {userId: enemyBoard.user_id, lobbyId: lobbyId, boardId: myBoard.id}));
                setIsOpenModal(true);
            } else {
                if (users && users.length !== 2) {
                    sendDeleteGame(props.client);
                    sendNotifDeletedGame(props.mainClient, lobbyId);
                };

                props.client.close();
                props.setClient(null);
                dispatch(clearState());
                navigate(url);
            };

        } else {
            navigate(url);
        };
    };

    return (
        <header className="header-app">
            <nav className="navLinks">
                <FontAwesomeIcon icon={faShip} className="app-icon"/>
                <NavLink to={`/profile/${username}`} className="navLink" onClick={(e) => 
                    onClickHandler(e, `/profile/${username}/`)}>
                    Profile
                </NavLink>
                <NavLink to="/lobbies" className="navLink" onClick={(e) => 
                    onClickHandler(e, "/lobbies/")}>
                    Lobbies
                </NavLink>
                <NavLink to="/leadboard" className="navLink" onClick={(e) => 
                    onClickHandler(e, "/leadboard/")}>
                    Leadboard
                </NavLink>
                <NavLink to="/about" className="navLink" onClick={(e) => 
                    onClickHandler(e, "/about/")}>
                    About
                </NavLink>
            </nav>
            <div className="aside-header">
                <Link to="/" onClick={(e) => onClickHandler(e, "/")}>v0.1.0</Link>
                <Link to="/" onClick={(e) => onClickHandler(e, "/")}>GitHub</Link>
            </div>

            {isOpenModal && <LobbyWindow 
                                type="give-up" 
                                msg="Do you really want to follow the link? It will count as a loss!"
                                client={props.client}
                                setClient={props.setClient}
                                setIsOpenModal={setIsOpenModal}
                                content={content}/>}

        </header>
    );
};  

export default Header;