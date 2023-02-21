import "./Chat.css";

function Chat(props) {

    return (
        <div>
            <textarea className="dialog" rows="20" disabled></textarea>
            <div className="panel">
                <textarea className="message-input" rows="4"></textarea>
                <input className="send" type="button" value="send"/>
            </div>
        </div>
    );
};

export { Chat };