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

export function sendShot(client, lobbySlug, boardId, fieldName, timeToMove) {
    client.send(JSON.stringify({
        type: "take_shot",
        lobby_slug: lobbySlug,
        board_id: boardId,
        field_name: fieldName,
        time_to_move: timeToMove
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

export function sendWhoStarts(client, lobbySlug) {
    client.send(JSON.stringify({
        type: "who_starts", 
        lobby_slug: lobbySlug,
    }));
};

export function sendDetermineWinner(client, lobbySlug, enemyId=null) {
    const data = {type: "determine_winner", lobby_slug: lobbySlug};
    if (enemyId) data.enemy_id = enemyId;
    client.send(JSON.stringify(data));
};

export function sendCountDownTimer(client, lobbySlug, timeLeft, typeAction) {
    client.send(JSON.stringify({
        type: "countdown", 
        lobby_slug: lobbySlug,
        time_left: timeLeft,
        type_action: typeAction,
    }));
};

export function sendTimeIsOver(client, lobbySlug, BoardId, ships, board) {
    client.send(JSON.stringify({
        type: "time_is_over", 
        lobby_slug: lobbySlug,
        board_id: BoardId,
        ships: ships,
        board: board,
    }));
};
