import { useLoaderData, Await } from "react-router-dom";
import { Suspense, useRef } from "react";
import axios from "axios";

import { Lobby } from "../Lobby/Lobby";

import "./LobbyPage.css";
import { WSClient } from "../../../modules/webSocket";


function LobbyPage(props) {

    const {lobby, slug} = useLoaderData();
    let clientRef = useRef(null);

    if (!clientRef.current) {
        clientRef.current = new WSClient(slug);
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


async function getLobbyBySlug(slug) {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/lobbies/${slug}/`, {auth: {username: "admin", password: "admin"}});

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"});
    };

    return response.data;
}


const lobbyLoader = async ({params}) => {
    const slug = params.slug;
    return {lobby: getLobbyBySlug(slug), slug: slug};
};


export  {LobbyPage, lobbyLoader};
