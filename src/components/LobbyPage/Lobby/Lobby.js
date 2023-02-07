import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import { WSClient } from "../../../modules/webSocket";

import "./Lobby.css";


function Lobby(props) {
    const initialShips = [
        {count: 4, size: 1, name: "singledeck", plane: "horizontal"},
        {count: 3, size: 2, name: "doubledeck", plane: "horizontal"},
        {count: 2, size: 3, name: "tripledeck", plane: "horizontal"},
        {count: 1, size: 4, name: "fourdeck", plane: "horizontal"}, 
    ];
    const client =  new WSClient(props.lobbySlug);
    
    const [lobby, setLobby] = useState(props.lobby);
    const [currentShip, setCurrentShip] = useState({});
    const [ships, setShips] = useState(initialShips);
    const [isCanPutShip, setIsCanPutShip] = useState(true);

    function returnShips() {
        setShips(initialShips);
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
        updatedLobby.maps[0] = board;
        setLobby(updatedLobby);
        setCurrentShip();
    };

    function makeShoot(columnName, column) {
        const updatedLobby = Object.assign({}, lobby);
        updatedLobby.maps[1][columnName] = JSON.stringify(column);
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
                    lobbySlug={props.lobbySlug}
                    client={client}
                    board={lobby.maps[0]} 
                    key={lobby.maps[0].id} 
                    ship={currentShip}
                    returnShips={returnShips}
                    updateColorShip={updateColorShip}
                    setUpdatedBoard={setUpdatedBoard}
                />
                <Board board={lobby.maps[1]} key={lobby.maps[1].id} makeShoot={makeShoot} lobbySlug={props.lobbySlug} client={client}/>
            </div>
            <Ships
                currentShip={currentShip} 
                setCurrentShip={setCurrentShip} 
                ships={ships} 
                setShips={setShips}
            />
        </div>
    );
};


export { Lobby };
