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

export function sendDetermineWinner(client, bet, isBot, enemyId=null) {
    client.send(JSON.stringify({
        type: "determine_winner", 
        bet: bet, 
        is_bot: isBot, 
        enemy_id: enemyId
    }));
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

export function sendAddUserToGame(client, lobbyId, boardId) {
    client.send(JSON.stringify({
        type: "add_user_to_game",
        lobby_id: lobbyId,
        board_id: boardId,
    }));
};

export function sendMessage(client, lobbyId, message) {
    client.send(JSON.stringify({
        type: "send_message",
        message: message,
        lobby_id: lobbyId,
    }));
};

export function sendPlayAgain(client, lobbyId, boardId, answer) {
    client.send(JSON.stringify({
        type: "is_play_again",
        lobby_id: lobbyId,
        board_id: boardId,
        answer: answer,
    }));
};

export function sendCreateNewGame(client, bet, name, timeToMove, timeToPlacement, enemyId, lobbyId, isBot) {
    client.send(JSON.stringify({
        type: "create_new_game",
        bet: bet,
        name: name,
        time_to_move: timeToMove,
        time_to_placement: timeToPlacement,
        enemy_id: enemyId,
        lobby_id: lobbyId,
        is_bot: isBot,
    }));
};

export function sendDeleteGame(client) {
    client.send(JSON.stringify({
        type: "delete_game",
    }));
};

export function sendBotTakeToShot(client, boardId, timeToMove) {
    client.send(JSON.stringify({
        type: "bot_take_to_shot",
        board_id: boardId,
        time_to_turn: timeToMove
    }));
};
