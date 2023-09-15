import { useSelector } from "react-redux";

import { determineDate } from "../../../modules/determneDate";
import { sendMessage } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";

import "./Chat.css";

function Chat(props) {
    const isPlayWithABot = useSelector(state => state.lobby.isPlayWithABot);
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
                    const [date, time] = message.created_in.split(" ");
                    const dateOfPreviosMessage = messages[number - 1]?.created_in.split(" ")[0];
                    const isNewDay = !(date === dateOfPreviosMessage);
                    return (
                        <div key={number}>

                            {number > 0 && isNewDay && determineDate(date, dateOfPreviosMessage)}

                            <div
                                className={username === message.owner ? "right-block-message" : "left-block-message"}>
                                {message.is_bot && <p className="bot-message">Bot</p>}
                                <p className="message">{message.message}</p>
                                <i className="created-in">{time.slice(0, 5)}</i>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="panel">
                <textarea id="message-input" rows="3" required disabled={isPlayWithABot | props.users.length === 2 ? false : true}/>
                <input className="send" type="button" value="send" disabled={isPlayWithABot | props.users.length === 2 ? false : true} 
                    onClick={(e) => onClickHandler(e)}/>
            </div>
        </div>
    );
};

export { Chat };