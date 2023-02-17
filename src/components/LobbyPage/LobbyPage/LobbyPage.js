import { useLoaderData, Await, redirect } from "react-router-dom";
import { Suspense, useRef } from "react";
import axios from "axios";

import { Lobby } from "../Lobby/Lobby";

import "./LobbyPage.css";
import { WSLobbyClient } from "../../../modules/websockets/WsLobbyClient";


function LobbyPage(props) {

    const {lobby, slug} = useLoaderData();
    let clientRef = useRef(null);

    if (!clientRef.current) {
        clientRef.current = new WSLobbyClient(slug);
    };

    return (
        <div className="main-page">
            <Suspense fallback={<h1 className="suspense">Lobby is loading...</h1>}>
                <Await resolve={lobby}>
                    {resolvedLobby => {return <Lobby lobby={resolvedLobby} client={clientRef.current}/>}}
                </Await>
            </Suspense>
        </div>
    );
};


async function getLobbyBySlug(slug, token) {
    const baseURL = "http://127.0.0.1:8000/api/v1";
    const response = await axios.get(`${baseURL}/lobbies/${slug}/`, {headers: {"Authorization": `Token ${token}`}});

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"});
    };

    return response.data;
}


const lobbyLoader = async ({params}) => {
    const slug = params.slug;
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
        return redirect(`/login?next=/lobbies/${slug}`);
    };

    return {lobby: getLobbyBySlug(slug, token), slug: slug};
};


export  {LobbyPage, lobbyLoader};
