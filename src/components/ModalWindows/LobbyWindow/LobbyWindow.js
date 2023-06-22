import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faQuestion } from '@fortawesome/free-solid-svg-icons';

import { sendDetermineWinner, sendPlayAgain } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { clearState } from "../../../store/reducers/lobbyReducer";

import "./LobbyWindow.css";


function LobbyWindow(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bet = useSelector(state => state.lobby.bet);

    function modalAgreeHandler() {
        if (props.type === "give-up") {
            giveUpHandler();
        } else if (props.type === "play-again") {
            playAgainHandler(true)
        };
        props.setIsOpenModal(false);
    };

    function giveUpHandler() {
        sendDetermineWinner(props.client, bet, props.content.userId);
        if (props.content.url) {
            playAgainHandler(false);
            props.client.close();
            props.setClient(null);
            dispatch(clearState());
            navigate(props.content.url);
        };
    };

    function playAgainHandler(answer) {
        sendPlayAgain(props.client, props.content.lobbyId, props.content.boardId, answer);
    };

    function modalCloseHandler() {
        props.type === "play-again" && playAgainHandler(false);
        props.setIsOpenModal(false);
    };

    return (
        <div className="wrap">
            <div className="modal">
                <div className="modal-title">
                    <FontAwesomeIcon icon={faQuestion} className="question-icon"/>
                    <FontAwesomeIcon icon={faClose} className="close-icon" onClick={() => modalCloseHandler()} />
                    <p className="title">Confirm action</p>
                </div>
                <p className="msg">{props.msg}</p>
                <div className="buttons">
                    <input type="button" className="back" value="Back" onClick={() => modalCloseHandler()} />
                    <input type="button" className="agree" value="Ok" onClick={() => modalAgreeHandler()}/>
                </div>
            </div>
        </div>
    );
};

export { LobbyWindow };