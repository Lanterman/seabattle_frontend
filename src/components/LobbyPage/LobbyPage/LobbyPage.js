import { useLoaderData, Await, redirect } from "react-router-dom";
import { Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { sendWhoStarts } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import  { defineLobbyStateAction } from "../../../store/reducers/lobbyReducer";
import { SidePanel } from "../SidePanel/SidePanel";
import { Lobby } from "../Lobby/Lobby";


import "./LobbyPage.css";


function LobbyPage(props) {

    const dispatch = useDispatch();
    const token = sessionStorage.getItem("auth_token");
    const userId = Number(sessionStorage.getItem("user_id"));
    const {lobby, slug} = useLoaderData();
    let clientRef = new useRef(null);

    if (!clientRef.current) {
        clientRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/lobby/${slug}/?token=${token}`);
    };

    return (
        <div>
            <div className="main-page">
                <Suspense fallback={<h1 className="suspense">Lobby is loading...</h1>}>
                    <Await resolve={lobby}>
                        {resolvedLobby => {
                            const boards = resolvedLobby.boards;
                            dispatch(defineLobbyStateAction(
                                boards[0]["user_id"] === userId ? 
                                    {myBoard: boards[0], enemyBoard: boards[1], ships: boards[0].ships} :
                                    {myBoard: boards[1], enemyBoard: boards[0], ships: boards[1].ships}
                            ));
                            const areUsersReady = boards[0]["is_ready"] & boards[1]["is_ready"];
                            const isChoseTurn = !boards[0]["my_turn"] & !boards[1]["my_turn"];
                            if (areUsersReady & isChoseTurn ) {
                                sendWhoStarts(clientRef.current, slug);
                            };
                            return <Lobby lobby={resolvedLobby} client={clientRef.current} lobbySlug={slug} />
                        }}
                    </Await>
                </Suspense>
            </div>
            <Suspense >
                <Await resolve={lobby}>
                    <SidePanel client={clientRef.current} />
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
