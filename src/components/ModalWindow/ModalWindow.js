import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faQuestion } from '@fortawesome/free-solid-svg-icons';

import { sendDetermineWinner } from "../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { clearState } from "../../store/reducers/lobbyReducer";


import "./ModalWindow.css";


function ModalWindow(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function modalAgreeHandler() {
        sendDetermineWinner(props.client, props.content.user_id);
        props.client.close();
        props.setClient(null);
        dispatch(clearState());
        props.setIsOpenModal(false);
        navigate(props.content.url);
    };

    function modalCloseHandler() {
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

export { ModalWindow };