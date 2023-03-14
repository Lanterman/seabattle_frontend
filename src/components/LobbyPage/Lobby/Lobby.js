import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { WSResponse } from "../../../modules/wsCommunication/wsLobby/wsLobbyResponse";
import { setEnemyBoard, setMyBoard, setIsCanPutShip, setTimeToMove } from "../../../store/reducers/lobbyReducer";
import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";
import { sendWhoStarts, sendDetermineWinner } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";


function Lobby(props) {
    const dispatch = useDispatch();
    const lobby = props.lobby;
    const userId = Number(sessionStorage.getItem("user_id"));
    const enemy = lobby.users[0]["id"] === userId ? lobby.users[1] : lobby.users[0];
    const winner = useSelector(state => state.lobby.winner);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const timeToMove = useSelector(state => state.lobby.timeToMove);
    const isCanPutShip = useSelector(state => state.lobby.isCanPutShip);
    const wsResp = new WSResponse();
    // console.log("поработать над закрытием вебсокета переходе на другую страницу, на уровне соединения с вебсокетом в python")
    // console.log("выводится информация о поле противника в инструменте разработчика, пофиксить это, мб выводить не доску, а поля")

    // console.log("Lобавить время на расстановку кораблей и ход, если не успел расставить корабли - ставятся рандомно, не сделал ход - проиграл")
    useEffect(() => {
        props.client.onopen = (e) => console.log("Websocket started");
        props.client.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.type === "send_shot") {
                userId === data.user_id ?
                    wsResp.takeShot(dispatch, setEnemyBoard, setMyBoard, enemyBoard, myBoard, data.board, data.is_my_turn) :
                    wsResp.takeShot(dispatch, setMyBoard, setEnemyBoard, myBoard, enemyBoard, data.board, data.is_my_turn);
                if (userId === data.user_id && data.enemy_ships === 0) {
                    sendDetermineWinner(props.client, props.lobbySlug);
                };

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
            } else if (data.type === "determine_winner") {
                wsResp.determinedWinner(dispatch, data.winner);
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

    function displayGameResults() {
        return (
            <p className="winner">
                {winner !== enemy.username ? <i id="won">You won!</i> : <i id="lose">You lose!</i>}
            </p>
        );
    };

    function countDown() {
        dispatch(setTimeToMove(timeToMove));

        return (
            <p className="count-down">
                {timeToMove}
            </p>
        );
    };

    return (
        <div className="singl-lobby">
            <h1 className="lobby-name">{lobby.name}</h1>
            <div className="lobby-options">
                <span className="bet">{lobby.bet}</span>
                <FontAwesomeIcon icon={faDollar}/>

                <span className="time-to-move">{lobby.time_to_move}</span>
                <FontAwesomeIcon icon={faClock}/>

                <Link to="/" className="enemy">
                    <span>{enemy.username}</span>
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
            </div>

            {winner ? displayGameResults() : setInterval(countDown(), 3000)}

            <div className="game-block">
                <Board client={props.client} board={myBoard} updateShipClassName={updateShipClassName} />
                <Board client={props.client} board={enemyBoard} lobbySlug={props.lobbySlug}/>
            </div>
            <Ships client={props.client} />
        </div>
    );
};


export { Lobby };
