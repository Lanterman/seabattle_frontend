import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { WSResponse } from "../../../modules/wsCommunication/wsLobby/wsLobbyResponse";
import { setEnemyBoard, setMyBoard, setIsCanPutShip } from "../../../store/reducers/lobbyReducer";
import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";
import { sendWhoStarts } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";


function Lobby(props) {
    const dispatch = useDispatch();
    const lobby = props.lobby;
    const userId = Number(sessionStorage.getItem("user_id"));
    const enemy = lobby.users[0]["id"] === userId ? lobby.users[1] : lobby.users[0];
    const myBoard = useSelector(state => state.lobby.myBoard);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const currentShip = useSelector(state => state.lobby.currentShip);
    const isCanPutShip = useSelector(state => state.lobby.isCanPutShip);
    const wsResp = new WSResponse();

    // console.log("поработать над закрытием вебсокета переходе на другую страницу, на уровне соединения с вебсокетом в python")
    // console.log("выводится информация о поле противника в инструменте разработчика, пофиксить это, мб выводить не доску, а поля")

    useEffect(() => {
        props.client.onopen = (e) => console.log("Websocket started");
        props.client.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.type === "send_shot") {
                userId === data.user_id ?
                    wsResp.takeShot(dispatch, setEnemyBoard, setMyBoard, enemyBoard, myBoard, data.board, data.is_my_turn) :
                    wsResp.takeShot(dispatch, setMyBoard, setEnemyBoard, myBoard, enemyBoard, data.board, data.is_my_turn);

            } else if (data.type === "drop_ship") {
                wsResp.updateBoard(dispatch, myBoard, data.board, data.ships);

            } else if (data.type === "clear_board") {
                wsResp.updateBoard(dispatch, myBoard, data.board, data.ships);

            } else if (data.type === "is_ready_to_play") {
                userId === data.user_id ?
                    wsResp.isReadyToPlay(dispatch, setMyBoard, myBoard, data.is_ready) :
                    wsResp.isReadyToPlay(dispatch, setEnemyBoard, enemyBoard, data.is_ready);

                if (myBoard["is_ready"] && enemyBoard["is_ready"] && data.user_id === userId) {
                    sendWhoStarts(props.client, props.lobbySlug);
                };

            } else if (data.type === "random_replaced") {
                wsResp.updateBoard(dispatch, myBoard, data.board, data.ships);

            } else if (data.type === "who_starts") {
                userId === data.user_id ?
                    wsResp.determineWhoIsTurning(dispatch, data.is_my_turn, myBoard, enemyBoard) :
                    wsResp.determineWhoIsTurning(dispatch, !data.is_my_turn, myBoard, enemyBoard);
            };
        };
    });

    function updateShipClassName(value) {
        dispatch(setIsCanPutShip(value));
        const actionShip = document.getElementsByClassName("action")[0];

        if (isCanPutShip) {
            actionShip.attributes.class.value = "ship action";
        } else {
            actionShip.attributes.class.value = "ship action not-put";
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
                    updateShipClassName={updateShipClassName}
                />
                <Board board={enemyBoard} client={props.client} lobbySlug={props.lobbySlug}/>
            </div>
            <Ships client={props.client} />
        </div>
    );
};


export { Lobby };
