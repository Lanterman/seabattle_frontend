import { setWinner, setMyBoard, setEnemyBoard, addMessage, setTimeLeft,
    addUserToLobby } from "../../../store/reducers/lobbyReducer";

export class WSResponse {

    takeShot(dispatch, firstMethod, secondMethod, firstBoard, secondBoard, newBoard, isMyTurn) {
        dispatch(firstMethod(Object.assign({}, firstBoard, newBoard, {"is_my_turn": !isMyTurn})));
        dispatch(secondMethod(Object.assign({}, secondBoard, {"is_my_turn": isMyTurn})));
    };

    updateBoard(dispatch, board, newBoard, ships) {
        dispatch(setMyBoard(Object.assign({}, board, newBoard, {ships: ships})));
    };

    setIsReadyToPlay(dispatch, method, board, isReady) {
        board.is_ready = isReady;
        dispatch(method(Object.assign({}, board)));
    };

    determineWhoIsTurning(dispatch, isMyTurn, myBoard, enemyBoard) {
        dispatch(setMyBoard(Object.assign({}, myBoard, {"is_my_turn": isMyTurn})));
        dispatch(setEnemyBoard(Object.assign({}, enemyBoard, {"is_my_turn": !isMyTurn})));
    };

    determinedWinner(dispatch, winner) {
        dispatch(setWinner(winner));
    };

    setTimeLeft(dispatch, timeLeft) {
        dispatch(setTimeLeft(timeLeft));
    };

    addUserToGame(dispatch, method, board, user, users) {
        dispatch(addUserToLobby([...users, user]))
        dispatch(method(Object.assign({}, board, {user_id: user.id})));
    };

    sendMessage(dispatch, message, messages) {
        dispatch(addMessage([message, ...messages]));
    };

    setIsPlayAgain(dispatch, method, board, is_play_again) {
        dispatch(method(Object.assign({}, board, {is_play_again: is_play_again})));
    };
};