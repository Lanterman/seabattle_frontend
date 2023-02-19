import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { DefineColorField } from "../../../modules/defineColorField";
import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";


function Lobby(props) {
    const lobby = props.lobby;
    const userId = Number(sessionStorage.getItem("user_id"));
    const [myBoard, setMyBoard] = useState(lobby.boards[0]["user_id"] === userId ? lobby.boards[0]: lobby.boards[1]);
    const [enemyBoard, setEnemyBoard] = useState(lobby.boards[0]["user_id"] !== userId ? lobby.boards[0]: lobby.boards[1]);
    const enemy = lobby.users[0]["id"] === userId ? lobby.users[1] : lobby.users[0];
    const [currentShip, setCurrentShip] = useState({});
    const [ships, setShips] = useState(myBoard.ships);
    const [isCanPutShip, setIsCanPutShip] = useState(true);
    const defineColorField = new DefineColorField();

    useEffect(() => {
        props.client.onopen = (e) => console.log("Websocket started");
        props.client.onmessage = (e) => {
            const data = JSON.parse(e.data);

            for (let key in data.board) {
                data.board[key] = JSON.stringify(data.board[key]);
            };

            if (data.type === "send_shot") {
                userId === data.user_id ?
                    setEnemyBoard(Object.assign({}, enemyBoard, data.board)) :
                    setMyBoard(Object.assign({}, myBoard, data.board));

            } else if (data.type === "drop_ship") {
                setMyBoard(Object.assign({}, myBoard, data.board));

            } else if (data.type === "clear_board") {
                defineColorField.defineColorField(data.field_name_list, "#e2e7e7");
                setMyBoard(Object.assign({}, myBoard, data.board))
                returnShips(data.ships);
            };
        };
    });

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

    return (
        <div className="singl-lobby">
            <h1 className="lobby-name">{lobby.name}</h1>
            <div className="lobby-options">
                <span className="bet">{lobby.bet}</span>
                <FontAwesomeIcon icon={faMoneyBillTransfer}/>

                <span className="time-to-move">{lobby.time_to_move}</span>
                <FontAwesomeIcon icon={faClock}/>

                <Link to="/" className="enemy">
                    <span>{enemy.username}</span>
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
            </div>
            
            <div className="game-block">
                <Board
                    client={props.client}
                    board={myBoard}
                    userId={userId}
                    ship={currentShip}
                    updateColorShip={updateColorShip}
                    defineColorField={defineColorField}
                />
                <Board board={enemyBoard} client={props.client}/>
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
