import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";


function Lobby(props) {
    const [lobby, setLobby] = useState(props.lobby);
    const userId = Number(sessionStorage.getItem("user_id"));
    const [myBoard, setMyBoard] = useState(lobby.boards[0]["user_id"] === userId ? lobby.boards[0]: lobby.boards[1]);
    const [enemyBoard, setEnemyBoard] = useState(lobby.boards[0]["user_id"] !== userId ? lobby.boards[0]: lobby.boards[1]);
    const enemy = lobby.users[0]["id"] === userId ? lobby.users[1] : lobby.users[0];
    const [currentShip, setCurrentShip] = useState({});
    const [ships, setShips] = useState(myBoard.ships);
    const [isCanPutShip, setIsCanPutShip] = useState(true);
    console.log("правильно выводить выстрелы на досках....")

    useEffect(() => {
        console.log("start");
        props.client.onopen = (e) => console.log("Websocket started");
        props.client.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.type === "send_shot") {
                // const updatedLobby = Object.assign({}, lobby);
                console.log("user", userId)
                console.log("myboard:", myBoard.id, myBoard.user_id)
                console.log("db_board:", data.board)
                console.log("enemy_board:", enemyBoard.id)

                for (let key in data.board) {
                    data.board[key] = JSON.stringify(data.board[key]);
                };
                myBoard.id === data.board.id ? setMyBoard(data.board) : setEnemyBoard(data.board)
                // setMyBoard(updatedLobby);
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

    function setUpdatedBoard(board) {
        const updatedLobby = Object.assign({}, lobby);
        updatedLobby.myBoard = board;
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
                    setShips={setShips}
                    returnShips={returnShips}
                    updateColorShip={updateColorShip}
                    setUpdatedBoard={setUpdatedBoard}
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
