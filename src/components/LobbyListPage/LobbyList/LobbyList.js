import { Suspense } from "react";
import axios from "axios";
import { Await, json, useLoaderData } from "react-router-dom";

import { Lobby } from "../Lobby/Lobby"

import "./LobbyList.css"

function LobbyList(props) {

    const {lobbyList} = useLoaderData();

    return (
        <div className="lobbyList">
            <h1 className="title">Lobbies</h1>
            <Suspense fallback={<h1 className="suspense">Loading...</h1>}>
                <Await resolve={lobbyList}>
                    {resolvedLobbyList => resolvedLobbyList.results.map((lobby) => <Lobby lobby={lobby} key={lobby.slug} />)}
                </Await>
            </Suspense>
        </div>
    );
};


async function getLobbyList() {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/lobbies/`, {auth: {username: "admin", password: "admin"}})

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"})
    }

    return response.data
};


const lobbyListLoader = async () => {
    const lobbyList = getLobbyList();

    if (!lobbyList) {
        throw json({message: "Not found", reason: "Wrong url!"}, {status: 404})
    }

    return {lobbyList};
};


export { LobbyList, lobbyListLoader };