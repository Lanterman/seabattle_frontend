import { useLoaderData, Await, redirect } from "react-router-dom";
import { Suspense, useRef, useState } from "react";
import axios from "axios";

import { SidePanel } from "../SidePanel/SidePanel";
import { Lobby } from "../Lobby/Lobby";


import "./LobbyPage.css";


function LobbyPage(props) {

    const {lobby, slug} = useLoaderData();
    const [isReady, setIsReady] = useState(false);
    let clientRef = new useRef(null);

    if (!clientRef.current) {
        clientRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/lobby/${slug}/?token=${sessionStorage.getItem("auth_token")}`);
    };

    return (
        <div>
            <SidePanel setIsReady={setIsReady} isReady={isReady} />
            <div className="main-page">
                <Suspense fallback={<h1 className="suspense">Lobby is loading...</h1>}>
                    <Await resolve={lobby}>
                        {resolvedLobby => {
                            return <Lobby lobby={resolvedLobby} client={clientRef.current} isReady={isReady} />
                        }}
                    </Await>
                </Suspense>
            </div>
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
};


const lobbyLoader = async ({params}) => {
    const slug = params.slug;
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
        return redirect(`/login?next=/lobbies/${slug}`);
    };

    return {lobby: getLobbyBySlug(slug, token), slug: slug};
};


export  {LobbyPage, lobbyLoader};
