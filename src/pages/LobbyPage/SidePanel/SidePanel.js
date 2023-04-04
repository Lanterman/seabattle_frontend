import { useSelector } from "react-redux";

import { sendReadyToPlay, sendRandomPlacement, sendDetermineWinner,
    sendCountDownTimer } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { createBoardVariable } from "../../../modules/services";
import { Chat } from "../Chat/Chat";

import "./SidePanel.css";

function SidePanel(props) {
    const winner = useSelector(state => state.lobby.winner);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const timeLeft = useSelector(state => state.lobby.timeLeft);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const users = useSelector(state => state.lobby.users);
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
        sendReadyToPlay(props.client, !myBoard.is_ready, enemyBoard.is_ready, myBoard.id);
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
        }, 1500);
    };

    function giveUpHandler(e) {
        if (window.confirm("Do you really want to give up?")) {
            sendDetermineWinner(props.client, enemyBoard.user_id);
        } else {
            sendCountDownTimer(props.client);
        };
    };

    return (
        <div className="side-panel">
            <Chat client={props.client} lobbyId={props.lobbyId} />
                <div className="buttons">
                    <input id="ready-button" type="button" value="Ready" 
                        onClick={(e) => readyOnClickHandler(e)} 
                        disabled={!winner & (!enemyBoard.is_ready || !myBoard.is_ready) & boardIsReady & timeLeft > 0 ?
                                    false : true}/><br/>
                    <input type="button" className="random-placement" value="Random placement"
                        disabled={!myBoard.is_ready && !winner ? false : true}
                        onClick={(e) => randomPlacementOnClickHandler(e)} /><br/>
                    <input className="give-up" type="button" value="Give up"
                        id={winner && "disabled"}
                        disabled={users.length === 2 & !winner ? false : true}
                        onClick={(e) => giveUpHandler(e)} />
                </div>
        </div>
    );
};

export { SidePanel };