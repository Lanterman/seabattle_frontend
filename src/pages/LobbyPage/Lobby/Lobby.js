import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faClock, faUser, faStar } from '@fortawesome/free-solid-svg-icons';

import { timer, createBoardVariable } from "../../../modules/services";
import { WSResponse } from "../../../modules/wsCommunication/wsLobby/wsLobbyResponse";
import { setEnemyBoard, setMyBoard, setIsCanPutShip, setTimeLeft, 
    clearState } from "../../../store/reducers/lobbyReducer";
import { sendWhoStarts, sendDetermineWinner, sendCountDownTimer, sendTimeIsOver, sendCreateNewGame, sendBotTakeToShot,
    sendAddUserToGame, sendMessage } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { sendNotifAddUserToGame } from "../../../modules/wsCommunication/wsApp/wsMainRequests";

import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";
import { LobbyWindow } from "../../../components/ModalWindows/LobbyWindow/LobbyWindow";

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
    const isPlayWithABot = useSelector(state => state.lobby.isPlayWithABot);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [me, enemy] = users[0]?.id === userId ? [users[0], users[1]] : [users[1], users[0]];
    const typeAction = myBoard.is_ready & enemyBoard.is_ready ? "turn" : "placement";
    const wsResp = new WSResponse();

    // Высветить модальное окно с предложением сыграть еще
    if (!timer.isAnswered && winner && myBoard.is_play_again === null) {
        setIsOpenModal(true);
        timer.isAnswered = true;
    };

    // console.log("Переработать переход на новую игру при обоюдном согласии о еще партии, временно перезагружает страницу")
    // console.log("Заменить прод редис на тестовый в тестах")
    
    useEffect(() => {
        // Начать обратный отсчет для подготовки или хода
        const countdown = (isPlayWithABot !== null | users.length === 2) & timeLeft > 0 & !winner && setInterval(() => countDownTimer(), 1000);

        // Добавить пользователя к игре и отправить сообщение в общий чат
        if (!timer.isEnemyConnected && users.length === 1 && me?.id !== userId) {
            sendAddUserToGame(props.client, lobby.id, !enemyBoard.user_id ? enemyBoard.id: myBoard.id);
            sendNotifAddUserToGame(props.mainClient, lobby.id);
            timer.isEnemyConnected = true;
        };

        // Если игра с ботом, расставляет корабли для бота и делает его готовым к игре
        if (isPlayWithABot !== null  & !enemyBoard.is_ready & lobby.time_to_placement > timeLeft & !timer.isBotIsReady) {
            const board = createBoardVariable(enemyBoard);
            sessionStorage.removeItem("last_hit");
            sendTimeIsOver(props.client, enemyBoard.id, enemyBoard.ships, board);
            timer.isBotIsReady = true
        };

        // Если ход бота
        if (isPlayWithABot !== null  & enemyBoard.is_my_turn & !timer.isBotShooted) {
            const lastHit = sessionStorage.getItem("last_hit") || "";
            sendBotTakeToShot(props.client, myBoard.id, lobby.time_to_move, lastHit, myBoard.ships, isPlayWithABot);
            timer.isBotShooted = true;
        };

        // Если время подготовки вышло, я готов, а враг нет - через 3 секунды он проиграет автоматически
        if (timeLeft === 0 && !winner && myBoard.is_ready && !enemyBoard.is_ready) {
            setTimeout(() => {
                if (timeLeft === 0 && !winner && myBoard.is_ready && !enemyBoard.is_ready) {
                    wsResp.setWinnerAndUpdateAnswerToBoards(dispatch, me.username, myBoard, enemyBoard);
                };
            }, 3000);
        }
        
        // Если время для расстановки вышло, а я не готов - расставляет и делает готовным к игре автоматически
        // Если время на ход вышло - проиграл автоматически
        if (!timer.isTimeIsOver && timeLeft <= 0) timeIsOver(typeAction, enemy.id, myBoard);

        // Создает новую игру при взаимном согласии
        if (timer.isAnswered && myBoard.is_play_again && (isPlayWithABot !== null || 
            (enemyBoard.is_play_again && winner === me.username))) {
            if (isPlayWithABot !== null || enemy.cash > lobby.bet) {
                sendCreateNewGame(props.client, lobby.bet, lobby.name, lobby.time_to_move, lobby.time_to_placement, 
                enemy ? enemy.id : me.id, lobby.id, isPlayWithABot);
            } else {
                sendMessage(props.client, lobby.id, `${enemy.username} don't have enough money!`);
            };
            timer.isAnswered = false;
        };

        props.client.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.type === "send_shot") {
                userId === data.user_id ?
                    wsResp.takeShot(dispatch, setEnemyBoard, setMyBoard, enemyBoard, myBoard, 
                        data.field_name_dict, data.is_my_turn) :
                    wsResp.takeShot(dispatch, setMyBoard, setEnemyBoard, myBoard, enemyBoard, 
                        data.field_name_dict, data.is_my_turn);
                
                wsResp.setTimeLeft(dispatch, data.time_left);

                if (userId === data.user_id && data.enemy_ships === 0) {
                    sendDetermineWinner(props.client, lobby.bet, isPlayWithABot, userId);
                };


                // A bot taken shot
            } else if (data.type === "bot_taken_to_shot") {
                const field_list = Object.keys(data.field_dict);
                field_list.map((field) => (
                    myBoard[field[0]][field] = data.field_dict[field]
                ));

                if (data.is_my_turn) {
                    dispatch(setMyBoard(Object.assign({}, myBoard, {"is_my_turn": data.is_my_turn})));
                    dispatch(setEnemyBoard(Object.assign({}, enemyBoard, {"is_my_turn": !data.is_my_turn})));
                    timer.isBotShooted = false;
                } else {
                    dispatch(setMyBoard(Object.assign({}, myBoard)));
                };

                sessionStorage.setItem("last_hit", data.last_hit);
                wsResp.setTimeLeft(dispatch, data.time_left);
                
                if (data.enemy_ships === 0) {
                    sendDetermineWinner(props.client, lobby.bet, isPlayWithABot);
                    sessionStorage.removeItem("last_hit");
                };



            } else if (["drop_ship", "clear_board", "random_placed"].includes(data.type)) {
                const [method, changedBoard] = data.board_id === myBoard.id ? 
                    [setMyBoard, myBoard] : [setEnemyBoard, enemyBoard];
                wsResp.updateBoard(dispatch, method, changedBoard, data.board, data.ships);

            } else if (data.type === "is_ready_to_play") {
                userId === data.user_id & data.board_id === myBoard.id ?
                    wsResp.setIsReadyToPlay(dispatch, setMyBoard, myBoard, data.is_ready) :
                    wsResp.setIsReadyToPlay(dispatch, setEnemyBoard, enemyBoard, data.is_ready);
                if (myBoard.is_ready & enemyBoard.is_ready) {
                    dispatch(setTimeLeft(lobby.time_to_move));
                    timer.isTimeIsOver = false;
                    if (data.user_id === userId) {
                        sendWhoStarts(props.client);
                        sendCountDownTimer(props.client, lobby.time_to_move);
                    };
                };

                // Обновить готовность бота на ложь для того, чтоб можно было начинать другие игры без перезагрузки (ВРЕМЕННО)
                if (timer.isBotIsReady === true) {
                    timer.isBotIsReady = false;
                };

            } else if (data.type === "who_starts") {
                userId === data.user_id ?
                    wsResp.determineWhoIsTurning(dispatch, data.is_my_turn, myBoard, enemyBoard) :
                    wsResp.determineWhoIsTurning(dispatch, !data.is_my_turn, myBoard, enemyBoard);

            } else if (data.type === "determine_winner") {
                wsResp.determinedWinner(dispatch, data.winner);

            } else if (data.type === "countdown") {
                wsResp.setTimeLeft(dispatch, data.time_left);

            } else if (data.type === "add_user_to_game") {
                if (data.user) {
                    wsResp.sendMessage(dispatch, data.message, messages);
                    userId === data.user.id ?
                        wsResp.addUserToGame(dispatch, setMyBoard, myBoard, data.user, users) :
                        wsResp.addUserToGame(dispatch, setEnemyBoard, enemyBoard, data.user, users);
                } else {
                    props.client.close();
                    dispatch(clearState());
                    props.navigate("/lobbies/");
                };

            } else if (data.type === "send_message") {
                wsResp.sendMessage(dispatch, data.message, messages);

            } else if (data.type === "is_play_again") {
                wsResp.sendMessage(dispatch, data.message, messages);

                if (isPlayWithABot !== null ) {
                    wsResp.setIsPlayAgain(dispatch, setMyBoard, myBoard, data.is_play_again);
                    wsResp.setIsPlayAgain(dispatch, setEnemyBoard, enemyBoard, data.is_play_again);
                } else {
                    userId === data.user_id ?
                        wsResp.setIsPlayAgain(dispatch, setMyBoard, myBoard, data.is_play_again) :
                        wsResp.setIsPlayAgain(dispatch, setEnemyBoard, enemyBoard, data.is_play_again);
                };

            } else if (data.type === "new_group") {
                setTimeout(() => document.location.href = `/lobbies/${data.lobby_slug}/`, 1000);
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
            sendDetermineWinner(props.client, lobby.bet, myBoard.is_my_turn && enemyId);
        } else {
            if (!myBoard.is_ready) {
                const board = createBoardVariable(myBoard);
                sendTimeIsOver(props.client, myBoard.id, myBoard.ships, board);
                timer.isTimeIsOver = true;
            };
        };
    };

    function countDownTimer() {
        if (timer.isCountdownHasStarted) {
            dispatch(setTimeLeft(timeLeft - 1));
        } else {
            sendCountDownTimer(props.client);
            timer.isCountdownHasStarted = true;
        };
    };

    function displayGameResults() {
        return (
            <p className="winner">
                {winner === "Bot" || winner === enemy?.username ? <i id="lose">You lose!</i> : <i id="won">You won!</i>}
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

                {isPlayWithABot !== null  ? 
                    <span className="enemy">
                        <span>Bot</span>
                        <FontAwesomeIcon icon={faUser}/>
                    </span> :
                    enemy && <span className="enemy">
                        <span>
                            <span>{enemy.username}</span>
                            <FontAwesomeIcon icon={faUser}/>
                            <div className="enemy-info">
                                <p className="user-info">First name: {enemy.first_name ? enemy.first_name : "None"}</p>
                                <p className="user-info">Last name: {enemy.last_name ? enemy.last_name : "None"}</p>
                                <p className="user-info">
                                    Rating: {enemy.rating}
                                    <FontAwesomeIcon className="user-rating" icon={faStar}/>
                                </p>
                            </div>
                        </span>
                    </span>
                }

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

            {!isPlayWithABot && users.length !== 2 && <div className="waiting"><i>Waiting for an enemy...</i></div>}
            {winner && (enemyBoard.is_play_again === null || myBoard.is_play_again === null) &&
                <div className="waiting"><i>Waiting for an enemy...</i></div>}
            {isOpenModal && <LobbyWindow 
                                type="play-again" 
                                msg="Do you want to play again?"
                                client={props.client}
                                setIsOpenModal={setIsOpenModal}
                                content={{userId: enemyBoard?.user_id, lobbyId: lobby.id, boardId: myBoard.id}}/>}
        </div>
    );
};


export { Lobby };
