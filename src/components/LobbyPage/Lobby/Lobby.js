import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";


function Lobby(props) {
    const [lobby, setLobby] = useState(props.lobby);
    const [ship, setShip] = useState({});
    const [isCanPutShip, setIsCanPutShip] = useState(true);
    console.log("возможность убрать корабль с поля")
    console.log("Менять цвет и плоскость перемещаемого корабля в зависимости от действия")

    function updateColorShip(value) {
        setIsCanPutShip(value);
        if (isCanPutShip) {
            ship.shipHtml.style.background = "#b7b9c7";
        } else {
            ship.shipHtml.style.background = "red";
        };
    };

    function setUpdatedBoard(board) {
        const updatedLobby = Object.assign({}, lobby);
        updatedLobby.maps[0] = board;
        setLobby(updatedLobby);
        setShip();
    }

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
                    board={lobby.maps[0]} 
                    key={lobby.maps[0].id} 
                    ship={ship}
                    updateColorShip={updateColorShip}
                    setUpdatedBoard={setUpdatedBoard}
                    />
                <Board board={lobby.maps[1]} key={lobby.maps[1].id} makeShoot={makeShoot}/>
            </div>
            <Ships setShip={setShip} ship={ship}/>
        </div>
    );
};


export { Lobby };
