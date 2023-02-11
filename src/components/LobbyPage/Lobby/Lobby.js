import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";


function Lobby(props) {
    
    const [lobby, setLobby] = useState(props.lobby);
    const [currentShip, setCurrentShip] = useState({});
    const [ships, setShips] = useState(props.lobby.boards[0].ships);
    const [isCanPutShip, setIsCanPutShip] = useState(true);

    function returnShips(ships) {
        setShips(ships);
        Array.from(document.getElementsByClassName("ship")).map(element => element.style.background = "#4382f7");
    };

    function updateColorShip(value) {
        setIsCanPutShip(value);
        if (isCanPutShip) {
            currentShip.shipHtml.style.background = "#b7b9c7";
        } else {
            currentShip.shipHtml.style.background = "red";
        };
    };

    function setUpdatedBoard(board) {
        const updatedLobby = Object.assign({}, lobby);
        updatedLobby.boards[0] = board;
        setLobby(updatedLobby);
    };

    function makeShoot(columnName, column) {
        const updatedLobby = Object.assign({}, lobby);
        updatedLobby.boards[1][columnName] = JSON.stringify(column);
        setLobby(updatedLobby);
    };

    return (
        <div className="singl-lobby">
            <h1 className="lobby-name">{lobby.name}</h1>
            <div className="lobby-options">
                <span className="bet">{lobby.bet}</span>
                <FontAwesomeIcon icon={faMoneyBillTransfer}/>

                <span className="time-to-move">{lobby.time_to_move}</span>
                <FontAwesomeIcon icon={faClock}/>

                <Link to="/" className="enemy">
                    <span>{lobby.users[0].username}</span>
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
            </div>
            
            <div className="game-block">
                <Board
                    client={props.client}
                    board={lobby.boards[0]} 
                    key={lobby.boards[0].id} 
                    ship={currentShip}
                    setShips={setShips}
                    returnShips={returnShips}
                    updateColorShip={updateColorShip}
                    setUpdatedBoard={setUpdatedBoard}
                />
                <Board board={lobby.boards[1]} key={lobby.boards[1].id} makeShoot={makeShoot}/>
            </div>
            <Ships
                client={props.client}
                setCurrentShip={setCurrentShip} 
                ships={ships} 
                setShips={setShips}
            />
        </div>
    );
};


export { Lobby };
