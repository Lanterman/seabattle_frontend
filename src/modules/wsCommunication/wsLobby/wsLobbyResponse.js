import { setMyBoard } from "../../../store/reducers/lobbyReducer";

export class WSResponse {

    takeShot(dispatch, method, board, newBoard) {
        dispatch(method(Object.assign({}, board, newBoard)));
    };;

    updateBoard(dispatch, board, newBoard, ships) {
        dispatch(setMyBoard(Object.assign({}, board, newBoard, {ships: ships})));
    };

    isReadyToPlay(dispatch, method, board, isReady) {
        board.is_ready = isReady;
        dispatch(method(Object.assign({}, board)));
    };
};