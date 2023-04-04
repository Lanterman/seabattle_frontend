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

export function sendShot(client, boardId, fieldName, timeToMove) {
    client.send(JSON.stringify({
        type: "take_shot",
        board_id: boardId,
        field_name: fieldName,
        time_to_turn: timeToMove
    }));
};

export function sendReadyToPlay(client, isReady, isEnemyReady, boardId) {
    client.send(JSON.stringify({
        type: "is_ready_to_play", 
        is_ready: isReady, 
        is_enemy_ready: isEnemyReady,
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

export function sendWhoStarts(client) {
    client.send(JSON.stringify({
        type: "who_starts", 
    }));
};

export function sendDetermineWinner(client, enemyId=null) {
    const data = {type: "determine_winner"};
    if (enemyId) data.enemy_id = enemyId;
    client.send(JSON.stringify(data));
};

export function sendCountDownTimer(client, timeToMove = null) {
    client.send(JSON.stringify({
        type: "countdown", 
        time_to_turn: timeToMove,
    }));
};

export function sendTimeIsOver(client, BoardId, ships, board) {
    client.send(JSON.stringify({
        type: "time_is_over", 
        board_id: BoardId,
        ships: ships,
        board: board,
    }));
};

export function sendAddUserToGame(client, boardId) {
    client.send(JSON.stringify({
        type: "add_user_to_game", 
        board_id: boardId,
    }));
};

export function sendMessage(client, lobbyId, message) {
    client.send(JSON.stringify({
        type: "send_message",
        message: message,
        lobby_id: lobbyId,
    }))
};
