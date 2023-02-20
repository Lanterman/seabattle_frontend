function sendRefreshBoard(client, boardId, ships, board) {
    client.send(JSON.stringify({
        type: "refresh_board",
        board_id: boardId,
        ships: ships,
        board: board,
    }));
};

function sendPutShip(client, shipId, boardId, plane, shipCount, fieldNameList, board) {
    client.send(JSON.stringify({
        type: "drop_ship",
        ship_id: shipId,
        board_id: boardId,
        ship_plane: plane,
        ship_count: shipCount,
        field_name_list: fieldNameList,
        board: board,
    }));
};

function sendToWS(client, boardId, fieldName) {
    client.send(JSON.stringify({
        type: "take_shot",
        board_id: boardId,
        field_name: fieldName,
    }));
};


export { sendRefreshBoard, sendPutShip, sendToWS };
