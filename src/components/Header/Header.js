import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { clearState } from "../../store/reducers/lobbyReducer";
import { ModalWindow } from "../ModalWindow/ModalWindow";

import "./Header.css";


function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lobbyId = useSelector(state => state.lobby.lobbyId);
    const winner = useSelector(state => state.lobby.winner);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const users = useSelector(state => state.lobby.users);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [content, setContent] = useState({});

    function onClickHandler(e, url) {
        e.preventDefault();
        if (location.pathname.length >= 45) {
            if (!winner && users.length === 2 && enemyBoard.user_id) {
                setContent(Object.assign({url: url}, {userId: enemyBoard.user_id, lobbyId: lobbyId, boardId: myBoard.id}));
                setIsOpenModal(true);
            } else {
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
                <NavLink to="/" className="navLink" onClick={(e) => onClickHandler(e, "/")}>Profile</NavLink>
                <NavLink to="/lobbies" className="navLink" onClick={(e) => onClickHandler(e, "/lobbies/")}>Lobbies</NavLink>
                <NavLink to="/leadboard" className="navLink" onClick={(e) => onClickHandler(e, "/leadboard/")}>Leadboard</NavLink>
                <NavLink to="/about" className="navLink" onClick={(e) => onClickHandler(e, "/about/")}>About</NavLink>
            </nav>
            <div className="aside-header">
                <Link to="/" onClick={(e) => onClickHandler(e, "/")}>v0.1.0</Link>
                <Link to="/" onClick={(e) => onClickHandler(e, "/")}>GitHub</Link>
            </div>

            {isOpenModal && <ModalWindow 
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