// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHeartMusicCameraBolt } from '@fortawesome/free-solid-svg-icons';

import "./CreateLobbyWindow.css";


function CreateLobbyWindow(props) {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    function modalCloseHandler() {
        props.setIsOpenModal(false);
    };

    return (
        <div className="wrap">
            <div className="modal">
                <div className="modal-title">
                    <FontAwesomeIcon icon={faHeartMusicCameraBolt} className="question-icon"/>
                    <FontAwesomeIcon icon={faClose} className="close-icon" onClick={() => modalCloseHandler()} />
                    <p className="title">Create lobby</p>
                </div>
                <p className="msg">{props.msg}</p>
                <div className="buttons">
                    <input type="button" className="back" value="Back" />
                    <input type="button" className="agree" value="Ok" />
                </div>
            </div>
        </div>
    );
};

export { CreateLobbyWindow };