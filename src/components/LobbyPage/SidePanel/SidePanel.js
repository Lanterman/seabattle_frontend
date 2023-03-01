import { useSelector } from "react-redux";

import { sendReadyToPlay, sendRandomPlacement, sendWhoStarts } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { createBoardVariable } from "../../../modules/services";
import { Chat } from "../Chat/Chat";

import "./SidePanel.css";

function SidePanel(props) {
    const myBoard = useSelector(state => state.lobby.myBoard);
    const areUsersReady = useSelector(state => state.lobby.areUsersReady);
    const board = createBoardVariable(myBoard);
    const ships = myBoard.ships;
    const boardIsReady = isShipPlaced();

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
            {/* {!areUsersReady && */}
                <div id="is-ready">
                    {boardIsReady ? 
                        <input className="ready-button" type="button" value="Ready" 
                            onClick={(e) => (
                                sendReadyToPlay(
                                    props.client, !myBoard.is_ready, myBoard.id
                                )
                            )}/> :
                        <i className="pre-ready-button" title="Not all ships are placed.">Ready</i>
                    }
                    <input type="button" className="random-placement" value="Random placement"
                        onClick={() => sendRandomPlacement(props.client, myBoard.id, board, ships)}/>
                </div>
            {/* } */}
            {console.log(areUsersReady)}
            {/* {areUsersReady ?? sendWhoStarts(props.client, myBoard.id, enemyBoard.id)} */}
        </div>
    );
};

export { SidePanel };