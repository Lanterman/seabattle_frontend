import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { timer, createBoardVariable } from "../../../modules/services";
import { WSResponse } from "../../../modules/wsCommunication/wsLobby/wsLobbyResponse";
import { sendWhoStarts, sendDetermineWinner,sendCountDownTimer, sendRandomPlacement, 
    sendReadyToPlay } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { setEnemyBoard, setMyBoard, setIsCanPutShip, setTimeToMove, 
    setTimeToPlacement } from "../../../store/reducers/lobbyReducer";
import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";


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
    const timeToPlacement = useSelector(state => state.lobby.timeToPlacement);
    const typeAction = myBoard.is_ready & enemyBoard.is_ready ? "turn" : "replacement";
    const timeLeft = typeAction === "turn" ? timeToMove : timeToPlacement;
    const wsResp = new WSResponse();
    // console.log("поработать над закрытием вебсокета переходе на другую страницу, на уровне соединения с вебсокетом в python")
    // console.log("выводится информация о поле противника в инструменте разработчика, пофиксить это, мб выводить не доску, а поля")

    console.log("Почему-то время плохо отсчитывается, пофиксить")
    console.log("делать проверку на ноль, удалять запись в редис после конца игры, после каждого хода обновлять время")
    console.log("Если не успел расставить корабли - ставятся рандомно, не сделал ход - проиграл")
    useEffect(() => {
        const countdown = timeLeft > 0 && setInterval(() => countDownTimer(), 1000);
        (!timer._timeIsOver & timeLeft <= 0 & !winner & (!myBoard.is_ready || myBoard.my_turn || enemyBoard.my_turn)) && 
            timeIsOver(typeAction, enemy.id, myBoard);

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
                    timer._countdownHasStarted = false;
                };

            } else if (data.type === "random_replaced") {
                wsResp.updateBoard(dispatch, myBoard, data.board, data.ships);

            } else if (data.type === "who_starts") {
                userId === data.user_id ?
                    wsResp.determineWhoIsTurning(dispatch, data.is_my_turn, myBoard, enemyBoard) :
                    wsResp.determineWhoIsTurning(dispatch, !data.is_my_turn, myBoard, enemyBoard);
            } else if (data.type === "determine_winner") {
                wsResp.determinedWinner(dispatch, data.winner);
            } else if (data.type === "countdown") {
                data.type_action !== "replacement" ? 
                    dispatch(setTimeToMove(data.time_left)) :
                    dispatch(setTimeToPlacement(data.time_left));
                    timer.countdownHasStarted = true;
            };
        };
        return () => clearInterval(countdown);
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

    function timeIsOver(typeAction, enemyId, myBoard) {
        if (typeAction === "turn") {
            sendDetermineWinner(props.client, props.lobbySlug, myBoard.my_turn && enemyId);
        } else {
            const board = createBoardVariable(myBoard);
            sendRandomPlacement(props.client, myBoard.id, board, myBoard.ships);
            sendReadyToPlay(props.client, true, myBoard.id)
            timer._timeIsOver = true;
        };
    };

    function countDownTimer() {
        if (!myBoard.is_ready || myBoard.my_turn || enemyBoard.my_turn) {
            typeAction === "turn" ? dispatch(setTimeToMove(timeLeft - 1)) : dispatch(setTimeToPlacement(timeLeft - 1));
        };

        (!timer.countdownHasStarted) && 
            sendCountDownTimer(props.client, props.lobbySlug, timeLeft, typeAction);
    };

    function displayGameResults() {
        return (
            <p className="winner">
                {winner !== enemy.username ? <i id="won">You won!</i> : <i id="lose">You lose!</i>}
            </p>
        );
    };

    function displayRunningGame() {
        return (<p className="count-down">
                    {typeAction === "turn" ? 
                        myBoard.my_turn ? <i id="my-turn">You turn </i> : <i id="enemy-turn">Enemy turn </i> :
                        <i>Preparation </i>}
                    {timer.countdownHasStarted ? 
                        (typeAction === "turn" & enemyBoard.my_turn ? 
                            <i id="little-time">{timeLeft}</i> :
                            <i id={timeLeft > 10 ? "lot-of-time" : "little-time"}>{timeLeft} </i>) :
                        "--"}
                </p>)
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

            {winner ? displayGameResults() : displayRunningGame()}

            <div className="game-block">
                <Board client={props.client} board={myBoard} updateShipClassName={updateShipClassName} />
                <Board client={props.client} board={enemyBoard} lobbySlug={props.lobbySlug}/>
            </div>
            <Ships client={props.client} />
        </div>
    );
};


export { Lobby };
