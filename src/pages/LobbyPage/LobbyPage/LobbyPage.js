import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, redirect, useOutletContext, useNavigate } from "react-router-dom";

import { timer } from "../../../modules/services";
import  { defineLobbyStateAction, clearState } from "../../../store/reducers/lobbyReducer";

import { SidePanel } from "../SidePanel/SidePanel";
import { Lobby } from "../Lobby/Lobby";


import "./LobbyPage.css";


function LobbyPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {lobby, slug} = useLoaderData(); 
    const outletContext = useOutletContext();
    const token = sessionStorage.getItem("auth_token");
    const userId = Number(sessionStorage.getItem("user_id"));
    const [isWSReady, setIsWSReady] = useState(false);
    const myBoard = useSelector(state => state.lobby.myBoard);
    const client = useMemo(() => {
        return lobby.status === 200 ? new WebSocket(`ws://127.0.0.1:8000/ws/lobby/${slug}/?token=${token}`) : null;
    }, [slug, token, lobby.status]);

    useEffect(() => {
        if (client) {
            client.onopen = (e) => {
                console.log("Websocket started");
                setIsWSReady(!!client.readyState);
            };

            client.onclose = (e) => {
                timer.isAnswered = false;
            };

            client.onerror = (e) => {
                console.log(e)
            };

            async function setPreStates() {
                const data = lobby.data;
                const boards = data.boards;

                dispatch(defineLobbyStateAction(
                    boards[0].user_id ?
                        (boards[0].user_id === userId ?
                            {lobbyId: data.id, myBoard: boards[0], enemyBoard: boards[1], winner: data.winner, 
                                timeLeft: data.time_left, timeToMove: data.time_to_move, users: data.users, 
                                messages: data.messages} :
                            {lobbyId: data.id, myBoard: boards[1], enemyBoard: boards[0], winner: data.winner, 
                                timeLeft: data.time_left, timeToMove: data.time_to_move, users: data.users, 
                                messages: data.messages}) :
                        (boards[1].user_id === userId ?
                            {lobbyId: data.id, myBoard: boards[1], enemyBoard: boards[0], winner: data.winner, 
                                timeLeft: data.time_left, timeToMove: data.time_to_move, users: data.users, 
                                messages: data.messages} :
                            {lobbyId: data.id, myBoard: boards[0], enemyBoard: boards[1], winner: data.winner, 
                                timeLeft: data.time_left, timeToMove: data.time_to_move, users: data.users, 
                                messages: data.messages})
                ));

                outletContext.setClient(client);
            };

            !isWSReady & !myBoard && setPreStates();
        } else {
            setTimeout(() => navigate("/lobbies/"), 1000);
        };
    });

    window.onpopstate = () => {
        client.close();
        outletContext.setClient(null);
        dispatch(clearState());
    };

    return client ? 
        (isWSReady && myBoard ? (
            <div>
                <div className="main-page">
                    {<Lobby lobby={lobby.data} client={client} lobbySlug={slug} navigate={navigate} 
                        setIsWSReady={setIsWSReady}/>}
                </div>
                <SidePanel client={client} lobbySlug={slug} lobbyId={lobby.data.id}/>
            </div>
            ) : <div className="main-page"><h1 className="suspense">Lobby is loading...</h1></div>) :
        <div className="main-page"><h1 className="is-full">The lobby is crowded</h1></div>;
};


async function getLobbyBySlug(slug, token) {
    try {
        const baseURL = "http://127.0.0.1:8000/api/v1";
        const response = await axios.get(`${baseURL}/lobbies/${slug}/`, {headers: {"Authorization": `Token ${token}`}});

        if (response.statusText !== "OK") {
            throw new Response("", {status: response.status, statusText: "Not found"});
        };

        return response;
    } catch (error) {
        if (error.response.status === 403) {
            return error.response;
        };
    };
};  


const lobbyLoader = async ({params}) => {
    const slug = params.slug;
    const token = sessionStorage.getItem("auth_token");
    const userId = Number(sessionStorage.getItem("user_id"))

    if (!token) {
        return redirect(`/login?next=/lobbies/${slug}`);
    };

    const lobby = await getLobbyBySlug(slug, token);

    if (lobby.status === 200 && lobby.data.password && lobby.data.users.length === 1 && 
        !(lobby.data.users[0].id === userId)) {
        const password = prompt("Enter password");
        if (!(lobby.data.password === password)) {
            alert("Wrong password");
            return redirect("/lobbies/");
        };
    };

    return {lobby: lobby, slug: slug};
};


export  {LobbyPage, lobbyLoader};
