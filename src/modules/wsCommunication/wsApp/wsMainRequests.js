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