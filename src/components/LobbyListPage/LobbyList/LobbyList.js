import { Suspense } from "react";
import axios from "axios";
import { Await, redirect, useLoaderData } from "react-router-dom";

import { Lobby } from "../Lobby/Lobby";

import "./LobbyList.css";

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


async function getLobbyList(token) {
    const baseURL = "http://127.0.0.1:8000/api/v1";
    const response = await axios.get(`${baseURL}/lobbies/`, {headers: {"Authorization": `Token ${token}`}});

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"});
    };

    return response.data;
};


const lobbyListLoader = async () => {
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
        return redirect("/login?next=/lobbies");
    };

    return {lobbyList: getLobbyList(token)};
};


export { LobbyList, lobbyListLoader };