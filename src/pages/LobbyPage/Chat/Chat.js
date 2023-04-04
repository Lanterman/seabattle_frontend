import { useSelector } from "react-redux";
import { sendMessage } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";

import "./Chat.css";

function Chat(props) {
    const messages = useSelector(state => state.lobby.messages);
    const username = sessionStorage.getItem("username");

    function onClickHandler(e) {
        const tag_message = document.getElementById("message-input");
        tag_message.reportValidity();
        if (tag_message.value) {
            sendMessage(props.client, props.lobbyId, tag_message.value);
            tag_message.value = "";
            e.target.disabled = true;
            setTimeout(() => {e.target.disabled = false}, 1500);
        };
    };

    return (
        <div>
            <div id="dialog">
                {messages.map((message, number) => {
                    return (
                        <div key={number}
                            className={username === message.owner ? "right-block-message" : "left-block-message"}>
                            <input id={number} type="hidden" value={message.created_in.split(" ")[0]} />
                            <p className="message">{message.message}</p>
                            <i className="created-in">{message.created_in.split(" ")[1].slice(0, 5)}</i>
                        </div>
                    );
                })}
            </div>
            <div className="panel">
                <textarea id="message-input" rows="3" required />
                <input className="send" type="button" value="send" onClick={(e) => onClickHandler(e)}/>
            </div>
        </div>
    );
};

export { Chat };