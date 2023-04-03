import { sendMessage } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";

import "./Chat.css";

function Chat(props) {

    function onClickHandler(e) {
        const message = document.getElementById("message-input").value
        sendMessage(props.client, message);
        document.getElementById("message-input").value = "";
    };

    return (
        <div>
            <textarea className="dialog" rows="25" disabled></textarea>
            <div className="panel">
                <textarea id="message-input" rows="3"></textarea>
                <input className="send" type="button" value="send" onClick={(e) => onClickHandler(e)}/>
            </div>
        </div>
    );
};

export { Chat };