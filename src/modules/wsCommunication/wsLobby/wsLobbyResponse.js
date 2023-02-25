import { setMyBoard, setShips } from "../../../store/reducers/lobbyReducer";

export class WSResponse {

    convertToJSON(board) {
        for (let key in board) {
            board[key] = JSON.stringify(board[key]);
        };
    };

    updatingBoardIsReadyField(board, isReady) {
        board.is_ready = isReady;
        return Object.assign({}, board);
    };

    sendShot(dispatch, method, board, newBoard) {
        dispatch(method(Object.assign({}, board, newBoard)));
    };;

    dropShip(dispatch, board, newBoard, ships) {
        dispatch(setMyBoard(Object.assign({}, board, newBoard)));
        dispatch(setShips(ships));
    };

    clearBoard(dispatch, board, newBoard, ships) {
        dispatch(setMyBoard(Object.assign({}, board, newBoard)));
        dispatch(setShips(ships));
    };

    isReadyToPlay(dispatch, method, board, isReady) {
        dispatch(method(this.updatingBoardIsReadyField(board, isReady)));
    };
};