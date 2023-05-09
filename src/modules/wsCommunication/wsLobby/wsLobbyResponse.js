import { setWinner, setMyBoard, setEnemyBoard, addMessage, setTimeLeft, updateAnswerToBoards,
    addUserToLobby } from "../../../store/reducers/lobbyReducer";

export class WSResponse {

    takeShot(dispatch, firstMethod, secondMethod, firstBoard, secondBoard, fieldNameDict, isMyTurn) {
        const keys = Object.keys(fieldNameDict);
        
        if (keys.length === 1) {
            firstBoard[keys[0][0]][keys[0]] = fieldNameDict[keys[0]];
        } else {
            keys.map((fieldName) => firstBoard[fieldName[0]][fieldName] = fieldNameDict[fieldName]);
        };

        dispatch(firstMethod(Object.assign({}, firstBoard, {"is_my_turn": !isMyTurn})));
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
        isMyTurn ? 
            dispatch(setMyBoard(Object.assign({}, myBoard, {"is_my_turn": isMyTurn}))) :
            dispatch(setEnemyBoard(Object.assign({}, enemyBoard, {"is_my_turn": !isMyTurn})));
    };

    determinedWinner(dispatch, winner) {
        dispatch(setWinner(winner));
    };

    setTimeLeft(dispatch, timeLeft) {
        dispatch(setTimeLeft(timeLeft));
    };

    addUserToGame(dispatch, method, board, user, users) {
        dispatch(method(Object.assign({}, board, {user_id: user.id})));
        dispatch(addUserToLobby([...users, user]));
    };

    sendMessage(dispatch, message, messages) {
        dispatch(addMessage([message, ...messages]));
    };

    setIsPlayAgain(dispatch, method, board, is_play_again) {
        dispatch(method(Object.assign({}, board, {is_play_again: is_play_again})));
    };

    setWinnerAndUpdateAnswerToBoards(dispatch, username, myBoard, enemyBoard) {
        dispatch(setWinner(username));
        dispatch(updateAnswerToBoards({
            myBoard: Object.assign(myBoard, {is_play_again: false}),
            enemyBoard: Object.assign(enemyBoard, {is_play_again: false})
        }));
    };
};