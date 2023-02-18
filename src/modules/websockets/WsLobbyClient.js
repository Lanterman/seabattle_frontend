class WSLobbyClient {
    constructor(slug) {
        this.isPut = false;
        this.client = new WebSocket(`ws://127.0.0.1:8000/ws/lobby/${slug}/?token=${sessionStorage.getItem("auth_token")}`);
    };

    refreshBoard(boardId, ships, board) {
        this.client.send(JSON.stringify({
            type: "refresh_board",
            board_id: boardId,
            ships: ships,
            board: board,
        }));
    };

    putShipOnBoard(shipId, boardId, plane, shipCount, fieldNameList, board) {
        this.client.send(JSON.stringify({
            type: "drop_ship",
            ship_id: shipId,
            board_id: boardId,
            ship_plane: plane,
            ship_count: shipCount,
            field_name_list: fieldNameList,
            board: board,
        }));
    };

    makeShot(boardId, fieldName) {
        this.client.send(JSON.stringify({
            type: "make_shot",
            board_id: boardId,
            field_name: fieldName,
        }))
    };
};


export { WSLobbyClient }
