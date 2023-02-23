import { useSelector } from "react-redux";

import { sendReadyToPlay } from "../../../modules/wsRequests/wsLobbyRequests";
import { Chat } from "../Chat/Chat";

import "./SidePanel.css";

function SidePanel(props) {
    const myBoard = useSelector(state => state.lobby.myBoard);

    return (
        <div className="side-panel">
            <Chat />
            {myBoard.isReady && <p className="label-ready">You ready!!!</p>}
            <input className="ready" type="button" value="Ready" 
                   onClick={(e) => sendReadyToPlay(props.client, !myBoard.isReady, myBoard.id)}/>
        </div>
    );
};

export { SidePanel };