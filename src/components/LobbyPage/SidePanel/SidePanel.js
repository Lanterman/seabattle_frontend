import { useSelector } from "react-redux";

import { sendReadyToPlay } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { Chat } from "../Chat/Chat";

import "./SidePanel.css";

function SidePanel(props) {
    const myBoard = useSelector(state => state.lobby.myBoard);
    const ships = useSelector(state => state.lobby.ships);
    const boardIsReady = isShipPlaced()

    function isShipPlaced() {
        for (let ship in ships) {
            if (ships[ship].count > 0) {
                return false;
            };
        };
        return true;
    };
 
    return (
        <div className="side-panel">
            <Chat />
            {myBoard.is_ready && <p className="label-ready">You ready!!!</p>}
            {boardIsReady ? 
                <input className="ready-button" type="button" value="Ready" 
                    onClick={(e) => sendReadyToPlay(props.client, !myBoard.is_ready, myBoard.id)}/> :
                <p className="pre-ready-button">Ready</p>
            }
            
        </div>
    );
};

export { SidePanel };