export function sendRefreshBoard(client, boardId, ships, board) {
    client.send(JSON.stringify({
        type: "refresh_board",
        board_id: boardId,
        ships: ships,
        board: board,
    }));
};

export function sendPutShip(client, shipId, boardId, plane, shipCount, fieldNameList, board) {
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

export function sendShot(client, boardId, fieldName) {
    client.send(JSON.stringify({
        type: "take_shot",
        board_id: boardId,
        field_name: fieldName,
    }));
};

export function sendReadyToPlay(client, isReady, boardId) {
    client.send(JSON.stringify({
        type: "is_ready_to_play", 
        is_ready: isReady, 
        board_id: boardId,
    }));
};

export function sendRandomPlacement(client, boardId, board, ships) {
    client.send(JSON.stringify({
        type: "random_placement", 
        board_id: boardId,
        board: board,
        ships: ships,
    }));
};

