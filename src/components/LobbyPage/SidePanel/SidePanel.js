import { useSelector } from "react-redux";

import { sendReadyToPlay, sendRandomPlacement, determineWinner } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { createBoardVariable } from "../../../modules/services";
import { Chat } from "../Chat/Chat";

import "./SidePanel.css";

function SidePanel(props) {
    const winner = useSelector(state => state.lobby.winner);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const ships = myBoard.ships;
    const boardIsReady = isShipPlaced();
    const board = createBoardVariable(myBoard);

    function isShipPlaced() {
        for (let ship in ships) {
            if (ships[ship].count > 0) {
                return false;
            };
        };
        return true;
    };

    function readyOnClickHandler(e) {
        sendReadyToPlay(props.client, !myBoard.is_ready, myBoard.id);
        e.target.disabled = true;
        setTimeout(() => {
            if (!enemyBoard.is_ready || !myBoard.is_ready) {
                e.target.disabled = false;
            };
        }, 3000);
    };

    function randomPlacementOnClickHandler(e) {
        sendRandomPlacement(props.client, myBoard.id, board, ships)
        e.target.disabled = true;
        setTimeout(() => {
            if (!myBoard.is_ready) {
                e.target.disabled = false;
            };
        }, 300);
    };

    function giveUpHandler(e) {
        if (window.confirm("Do you really want to give up?")) {
            determineWinner(props.client, props.lobbySlug, enemyBoard.user_id);
        };
    };

    return (
        <div className="side-panel">
            <Chat />
                <div className="buttons">
                    <input className="ready-button" type="button" value="Ready" 
                        onClick={(e) => readyOnClickHandler(e)} 
                        disabled={(!enemyBoard.is_ready || !myBoard.is_ready) && boardIsReady && !winner ? 
                                    false : true}/><br/>
                    <input type="button" className="random-placement" value="Random placement"
                        disabled={!myBoard.is_ready && !winner ? false : true}
                        onClick={(e) => randomPlacementOnClickHandler(e)} /><br/>
                    <input className="give-up" type="button" value="Give up"
                        id={winner && "disabled"}
                        disabled={!winner ? false : true}
                        onClick={(e) => giveUpHandler(e)} />
                </div>
        </div>
    );
};

export { SidePanel };