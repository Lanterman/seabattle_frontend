import { useState } from "react";
import { useSelector } from "react-redux";

import { sendReadyToPlay, sendRandomPlacement }from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { createBoardVariable } from "../../../modules/services";
import { Chat } from "../Chat/Chat";
import { LobbyWindow } from "../../../components/ModalWindows/LobbyWindow/LobbyWindow";

import "./SidePanel.css";

function SidePanel(props) {
    const winner = useSelector(state => state.lobby.winner);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const timeLeft = useSelector(state => state.lobby.timeLeft);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const isPlayWithABot = useSelector(state => state.lobby.isPlayWithABot);
    const users = useSelector(state => state.lobby.users);
    const ships = myBoard.ships;
    const boardIsReady = isShipPlaced();
    const board = createBoardVariable(myBoard);
    const [isOpenModal, setIsOpenModal] = useState(false);

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

    return (
        <div className="side-panel">
            <Chat client={props.client} lobbyId={props.lobbyId} users={users} />
                <div className="buttons">
                    <input id="ready-button" type="button" value="Ready" 
                        onClick={(e) => readyOnClickHandler(e)} 
                        disabled={((isPlayWithABot !== null || users.length === 2) & !winner & (!enemyBoard.is_ready || !myBoard.is_ready) & 
                            boardIsReady & timeLeft > 0 )? false : true}/>
                    <input type="button" className="random-placement" value="Random placement"
                        disabled={(isPlayWithABot || users.length === 2) && !myBoard.is_ready && !winner ? false : true}
                        onClick={(e) => randomPlacementOnClickHandler(e)} />
                    <input className="give-up" type="button" value="Give up"
                        disabled={(isPlayWithABot || (users.length === 2 && enemyBoard.user_id)) && !winner ? false : true}
                        onClick={() => setIsOpenModal(true)} />
                </div>

                {isOpenModal && <LobbyWindow 
                                    type="give-up" 
                                    msg="Do you really want to give up?"
                                    client={props.client}
                                    setClient={props.setClient}
                                    setIsOpenModal={setIsOpenModal}
                                    content={{userId: enemyBoard?.user_id}}/>}

        </div>
    );
};

export { SidePanel };