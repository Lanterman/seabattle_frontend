export function sendNotifCreatedGame(client, lobbySlug) {
    client.send(JSON.stringify({
        type: "created_game",
        lobby_slug: lobbySlug,
    }));
};

export function sendNotifDeletedGame(client, lobbyId) {
    client.send(JSON.stringify({
        type: "deleted_game",
        lobby_id: lobbyId,
    }));
};

export function sendNotifAddUserToGame(client, lobbyId) {
    client.send(JSON.stringify({
        type: "add_user_to_game",
        lobby_id: lobbyId,
    }));
};