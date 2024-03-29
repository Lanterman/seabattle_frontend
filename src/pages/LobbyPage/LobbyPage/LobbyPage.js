import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, redirect, useOutletContext, useNavigate, Navigate } from "react-router-dom";

import { timer } from "../../../modules/services";
import { refreshTokenRequest } from "../../../modules/requestsToBackend";
import  { defineLobbyStateAction, clearState } from "../../../store/reducers/lobbyReducer";
import { sendDeleteGame } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { sendNotifDeletedGame } from "../../../modules/wsCommunication/wsApp/wsMainRequests";

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
    const users = useSelector(state => state.lobby.users);
    const client = useMemo(() => {
        return lobby.status === 200 ? new WebSocket(`${window.env.BASE_URL_WS}/ws/lobby/${slug}/?token=${token}`) : null;
    }, [slug, token, lobby.status]);

    useEffect(() => {
        if (client) {
            client.onopen = (e) => {
                console.log("Websocket connected!")
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
                                bet: data.bet, timeLeft: data.time_left, timeToMove: data.time_to_move, 
                                is_play_with_a_bot: data.is_play_with_a_bot, users: data.users, 
                                messages: data.messages} :
                            {lobbyId: data.id, myBoard: boards[1], enemyBoard: boards[0], winner: data.winner, 
                                bet: data.bet, timeLeft: data.time_left, timeToMove: data.time_to_move, 
                                is_play_with_a_bot: data.is_play_with_a_bot, users: data.users, 
                                messages: data.messages}) :
                        (boards[1].user_id === userId ?
                            {lobbyId: data.id, myBoard: boards[1], enemyBoard: boards[0], winner: data.winner, 
                                bet: data.bet, timeLeft: data.time_left, timeToMove: data.time_to_move, 
                                is_play_with_a_bot: data.is_play_with_a_bot, users: data.users, 
                                messages: data.messages} :
                            {lobbyId: data.id, myBoard: boards[0], enemyBoard: boards[1], winner: data.winner, 
                                bet: data.bet, timeLeft: data.time_left, timeToMove: data.time_to_move, 
                                is_play_with_a_bot: data.is_play_with_a_bot, users: data.users, 
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
        if (users.length !== 2) {
            sendDeleteGame(client);
            sendNotifDeletedGame(outletContext.mainClient, lobby.data.id);
        };

        client.close();
        outletContext.setClient(null);
        dispatch(clearState());
    };

    return lobby.status === 404 ? 
        <div className="main-page"><h1 className="is-full">The lobby has been removed</h1></div> :
        (lobby.status === 403 ?
            <div className="main-page"><h1 className="is-full">{lobby.data.detail}</h1></div> :
            (lobby.status === 401 ?
                <Navigate to={`/sign-in?next=/lobbies/${slug}`} />:
                (isWSReady && myBoard ? (
                    <div>
                        <div className="main-page">
                            {<Lobby lobby={lobby.data} client={client} lobbySlug={slug} navigate={navigate} 
                                setIsWSReady={setIsWSReady} mainClient={outletContext.mainClient}/>}
                        </div>
                        <SidePanel client={client} lobbySlug={slug} lobbyId={lobby.data.id}/>
                    </div>
                    ) : <div className="main-page"><h1 className="suspense">Lobby is loading...</h1></div>)));
};


async function getLobbyBySlug(slug, token) {
    const response = await axios.get(
        `${window.env.BASE_URL}/lobbies/${slug}/`, 
        {headers: {"Authorization": `${window.env.TYPE_TOKEN} ${token}`}}
    )
        .then(function(response) {
            return response
        })
        .catch(async function(error) {
            if (error.response.status === 401) {
                if (error.response.data.detail === "Token expired.") {
                    const isRedirect = await refreshTokenRequest();
                    if (!isRedirect) {
                        return await getLobbyBySlug(slug, sessionStorage.getItem("auth_token"));
                    };
                };
                return error.response;
            } else if (error.response.status === 403) {
                return error.response;
            } else if (error.response.status === 404) {
                return error.response;
            };
        });

    return response;
};  


const lobbyLoader = async ({params}) => {
    const slug = params.slug;
    const token = sessionStorage.getItem("auth_token");
    const userId = Number(sessionStorage.getItem("user_id"))

    if (!token) {
        return redirect(`/sign-in?next=/lobbies/${slug}`);
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
