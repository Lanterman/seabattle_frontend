class WSClient {
    constructor(slug) {
        this.lobbySlug = slug;
        this.client = new WebSocket(`ws://127.0.0.1:8000/ws/lobby/${this.lobbySlug}/`);
    };

    refreshBoard(boardId, userId, board) {
        this.client.send(JSON.stringify({
            "type": "refresh_board",
            "board_id": boardId,
            "user_id": userId,
            "board": board,
        }));
    };

    putShipOnBoard(userId, fieldNameList, shipName, board) {
        this.client.send(JSON.stringify({
            "type": "put_ship",
            "user_id": userId,
            "field_name_list": fieldNameList,
            "ship_name": shipName,
            "board": board,
        }));
    };

};


export { WSClient }
