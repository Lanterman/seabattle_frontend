import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { timer, createBoardVariable } from "../../../modules/services";
import { WSResponse } from "../../../modules/wsCommunication/wsLobby/wsLobbyResponse";
import { setEnemyBoard, setMyBoard, setIsCanPutShip, setTimeLeft } from "../../../store/reducers/lobbyReducer";
import { sendWhoStarts, sendDetermineWinner, sendCountDownTimer, sendTimeIsOver, sendPlayAgain,
    sendAddUserToGame } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";

import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";


function Lobby(props) {
    const dispatch = useDispatch();
    const lobby = props.lobby;
    const userId = Number(sessionStorage.getItem("user_id"));
    const winner = useSelector(state => state.lobby.winner);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const timeLeft = useSelector(state => state.lobby.timeLeft);
    const users = useSelector(state => state.lobby.users);
    const messages = useSelector(state => state.lobby.messages);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const isCanPutShip = useSelector(state => state.lobby.isCanPutShip);
    const enemy = users[0]["id"] === userId ? users[1] : users[0];
    const typeAction = myBoard.is_ready & enemyBoard.is_ready ? "turn" : "placement";
    const wsResp = new WSResponse();
    // console.log("выводится информация о поле противника в инструменте разработчика, пофиксить это, мб выводить не доску, а поля")
    // console.log("Проверить почему иногда закрытие вебсокета с ошибкой 1006")
    // console.log("Доделать CSS ожидания ответа противника, если оба согласны - создать и перенаправить на новую, иначе ничего")
    // console.log("Потом тесты")

    // console.log("В дальнейшем при выходе из лобби, если только 1 пользователь, удалять ее")
    // console.log("Удалять таски селери из редис")

    useEffect(() => {
        const countdown = users.length === 2 & timeLeft > 0 & !winner && setInterval(() => countDownTimer(), 1000);
        if (winner && myBoard.is_play_again === null) {
            const answer = window.confirm("Do you want to play again?");
            sendPlayAgain(props.client, myBoard.id, answer);
        };
        if (users.length === 1 & users[0].id !== userId) sendAddUserToGame(props.client, myBoard.id);
        if (!timer.timeIsOver & timeLeft <= 0) timeIsOver(typeAction, enemy.id, myBoard);

        props.client.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.type === "send_shot") {
                userId === data.user_id ?
                    wsResp.takeShot(dispatch, setEnemyBoard, setMyBoard, enemyBoard, myBoard, data.board, data.is_my_turn) :
                    wsResp.takeShot(dispatch, setMyBoard, setEnemyBoard, myBoard, enemyBoard, data.board, data.is_my_turn);
                if (userId === data.user_id && data.enemy_ships === 0) {
                    sendDetermineWinner(props.client);
                };

            } else if (data.type === "drop_ship") {
                wsResp.updateBoard(dispatch, myBoard, data.board, data.ships);

            } else if (data.type === "clear_board") {
                wsResp.updateBoard(dispatch, myBoard, data.board, data.ships);

            } else if (data.type === "is_ready_to_play") {
                userId === data.user_id ?
                    wsResp.setIsReadyToPlay(dispatch, setMyBoard, myBoard, data.is_ready) :
                    wsResp.setIsReadyToPlay(dispatch, setEnemyBoard, enemyBoard, data.is_ready);
                if (myBoard.is_ready & enemyBoard.is_ready) {
                    dispatch(setTimeLeft(lobby.time_to_move));
                    timer.timeIsOver = false;
                    if (data.user_id === userId) {
                        sendWhoStarts(props.client);
                        sendCountDownTimer(props.client, lobby.time_to_move);
                    };
                };

            } else if (data.type === "random_placed") {
                wsResp.updateBoard(dispatch, myBoard, data.board, data.ships);

            } else if (data.type === "who_starts") {
                console.log(data)
                userId === data.user_id ?
                    wsResp.determineWhoIsTurning(dispatch, data.is_my_turn, myBoard, enemyBoard) :
                    wsResp.determineWhoIsTurning(dispatch, !data.is_my_turn, myBoard, enemyBoard);

            } else if (data.type === "determine_winner") {
                wsResp.determinedWinner(dispatch, data.winner);

            } else if (data.type === "countdown") {
                wsResp.setTimeLeft(dispatch, data.time_left);

            } else if (data.type === "add_user_to_game") {
                userId === data.user.id ?
                    wsResp.addUserToGame(dispatch, setMyBoard, myBoard, data.user, users) :
                    wsResp.addUserToGame(dispatch, setEnemyBoard, enemyBoard, data.user, users);

            } else if (data.type === "send_message") {
                wsResp.sendMessage(dispatch, data.message, messages);

            } else if (data.type === "is_play_again") {
                userId === data.user_id ?
                    wsResp.setIsPlayAgain(dispatch, setMyBoard, myBoard, data.is_play_again) :
                    wsResp.setIsPlayAgain(dispatch, setEnemyBoard, enemyBoard, data.is_play_again);
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
            sendDetermineWinner(props.client, myBoard.is_my_turn && enemyId);
        } else {
            if (!myBoard.is_ready) {
                const board = createBoardVariable(myBoard);
                sendTimeIsOver(props.client, myBoard.id, myBoard.ships, board);
                timer.timeIsOver = true;
            };
        };
    };

    function countDownTimer() {
        if (timer.countdownHasStarted) {
            dispatch(setTimeLeft(timeLeft - 1));
        } else {
            sendCountDownTimer(props.client);
            timer.countdownHasStarted = true;
        };
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
                        myBoard.is_my_turn ? <i id="my-turn">You turn </i> : <i id="enemy-turn">Enemy turn </i> :
                        <i>Preparation </i>}
                    {(typeAction === "turn" & enemyBoard.is_my_turn ? 
                        <i id="red-time">{timeLeft}</i> :
                        <i id={timeLeft > 10 ? "blue-time" : "red-time"}>{timeLeft} </i>)}
                </p>)
    };

    return (
        <div className="singl-lobby">
            <h1 className="lobby-name">{lobby.name}</h1>
            <div className="lobby-options">
                <span title="Bet">
                <span className="bet">{lobby.bet}</span>
                    <FontAwesomeIcon icon={faDollar}/>
                </span>
                <span title="Time to turn">
                    <span className="time-to-move" >{lobby.time_to_move}</span>
                    <FontAwesomeIcon icon={faClock}/>
                </span>

                {enemy && <span className="enemy">
                    <span>
                        <span>{enemy.username}</span>
                        <FontAwesomeIcon icon={faUser}/>
                        <div className="enemy-info">
                            <p className="info">First name: {enemy.first_name ? enemy.first_name : "None"}</p>
                            <p className="info">Last name: {enemy.last_name ? enemy.last_name : "None"}</p>
                        </div>
                    </span>
                </span>}

            </div>

            {winner ? displayGameResults() : displayRunningGame()}

            <div className="game-block">
                <Board 
                    client={props.client} 
                    board={myBoard} 
                    enemyId={enemy?.id} 
                    updateShipClassName={updateShipClassName} />
                <Board client={props.client} board={enemyBoard} enemyId={enemy?.id} lobbySlug={props.lobbySlug}/>
            </div>
            <Ships client={props.client} />
            {users.length !== 2 && <div className="waiting"><i>Waiting for an enemy...</i></div>}
            {winner && enemyBoard.is_play_again === null && <div className="waiting-new-game">Waiting for an enemy...</div>}
        </div>
    );
};


export { Lobby };
