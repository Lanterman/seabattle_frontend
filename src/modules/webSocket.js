class WSClient {
    constructor(slug) {
        this.isPut = false;
        this.client = new WebSocket(`ws://127.0.0.1:8000/ws/lobby/${slug}/`);
    };

    refreshBoard(boardId, userId, ships, board) {
        this.client.send(JSON.stringify({
            type: "refresh_board",
            board_id: boardId,
            user_id: userId,
            ships: ships,
            board: board,
        }));
    };

    putShipOnBoard(userId, shipId, boardId, plane, shipCount, fieldNameList, board) {
        this.client.send(JSON.stringify({
            type: "drop_ship",
            user_id: userId,
            ship_id: shipId,
            board_id: boardId,
            ship_plane: plane,
            ship_count: shipCount,
            field_name_list: fieldNameList,
            board: board,
        }));
    };

};


export { WSClient }
