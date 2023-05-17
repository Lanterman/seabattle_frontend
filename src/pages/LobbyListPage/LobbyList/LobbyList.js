import { Suspense } from "react";
import axios from "axios";
import { Await, redirect, useLoaderData, useActionData } from "react-router-dom";

import { Lobby } from "../Lobby/Lobby";

import "./LobbyList.css";

function LobbyList(props) {

    const {lobbyList} = useLoaderData();
    const lobbyListAction = useActionData();

    return (
        <div className="lobbyList">
            <h1 className="title">Lobbies</h1>

            {lobbyListAction && lobbyListAction.map((lobby) => <Lobby lobby={lobby} key={lobby.slug} />)}

            {!lobbyListAction && (
                <Suspense fallback={<h1 className="suspense">Loading...</h1>}>
                    <Await resolve={lobbyList}>
                        {resolved => resolved.results.map((lobby) => <Lobby lobby={lobby} key={lobby.slug} />)}
                    </Await>
                </Suspense>
            )}
        </div>
    );
};


async function getLobbyList(token, queryParams) {
    const baseURL = "http://127.0.0.1:8000/api/v1";
    const response = await axios.get(`${baseURL}/lobbies/${queryParams}`, {headers: {"Authorization": `Token ${token}`}});

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"});
    };

    return response.data;
};


const lobbyListLoader = async ({request}) => {
    const token = sessionStorage.getItem("auth_token");
    const queryParams = request.url.split("?")[1];

    if (!token) {
        return redirect("/login?next=/lobbies");
    };

    return {lobbyList: getLobbyList(token, `?${queryParams}`)};
};


export { LobbyList, lobbyListLoader };