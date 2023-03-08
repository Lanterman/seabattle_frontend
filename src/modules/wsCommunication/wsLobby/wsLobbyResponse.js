import { setWinner, setMyBoard, setEnemyBoard } from "../../../store/reducers/lobbyReducer";

export class WSResponse {

    takeShot(dispatch, firstMethod, secondMethod, firstBoard, secondBoard, newBoard, isMyTurn) {
        dispatch(firstMethod(Object.assign({}, firstBoard, newBoard, {"my_turn": !isMyTurn})));
        dispatch(secondMethod(Object.assign({}, secondBoard, {"my_turn": isMyTurn})));
    };

    updateBoard(dispatch, board, newBoard, ships) {
        dispatch(setMyBoard(Object.assign({}, board, newBoard, {ships: ships})));
    };

    isReadyToPlay(dispatch, method, board, isReady) {
        board.is_ready = isReady;
        dispatch(method(Object.assign({}, board)));
    };

    determineWhoIsTurning(dispatch, isMyTurn, myBoard, enemyBoard) {
        dispatch(setMyBoard(Object.assign({}, myBoard, {"my_turn": isMyTurn})));
        dispatch(setEnemyBoard(Object.assign({}, enemyBoard, {"my_turn": !isMyTurn})));
    };

    determinedWinner(dispatch, winner) {
        dispatch(setWinner(winner));
    }
};