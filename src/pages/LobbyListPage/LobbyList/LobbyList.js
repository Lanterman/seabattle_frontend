import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActionData, Navigate } from "react-router-dom";

import { Lobby } from "../Lobby/Lobby";
import { displayWsResult } from "../../../modules/services";
import { sendNotifCreatedGame } from "../../../modules/wsCommunication/wsApp/wsMainRequests";
import { setLobbyList } from "../../../store/reducers/lobbyListReducer";

import "./LobbyList.css";

function LobbyList(props) {
    const dispath = useDispatch();
    const mainAction = useActionData();
    const userId = sessionStorage.getItem("user_id");
    const lobbyList = props.lobbyList;

    useEffect(() => {
        if (mainAction?.lobbySlug && mainAction?.lobbySlug !== displayWsResult._lobbySlug) {
            sendNotifCreatedGame(props.mainClient, mainAction.lobbySlug);
            displayWsResult._lobbySlug = mainAction.lobbySlug;
        };

        props.mainClient.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const location = window.location;

            if (data.type === "created_game") {
                if (["/lobbies/", "/lobbies"].includes(location.pathname) && 
                        data.user_id !== userId && !location.search) {
                    dispath(setLobbyList([...lobbyList, data.lobby]));
                };

            } else if (data.type === "deleted_game") {
                if (["/lobbies/", "/lobbies"].includes(location.pathname)) {
                    lobbyList.map((lobby, number) => {
                        if (lobby["id"] === data.lobby_id) {
                            lobbyList.splice(number, 1);
                        };
                        return lobbyList;
                    });
                    dispath(setLobbyList([...lobbyList]));
                };

            } else if (data.type === "add_user_to_game") {
                if (["/lobbies/", "/lobbies"].includes(location.pathname) &&
                        data.user_id !== userId && !location.search) {
                    lobbyList.map((lobby, number) => {
                        if (lobby["id"] === data.lobby_id) {
                            lobbyList.splice(number, 1);
                        };
                    dispath(setLobbyList([...lobbyList]));
                    return lobbyList;
                    });
                };
            };
        };
    });

    return (
        <div className="lobbyList">
            <h1 className="title">Lobbies</h1>

            {mainAction?.lobbySlug && <Navigate to={`/lobbies/${mainAction.lobbySlug}`} />}

            {props.lobbyList.length ? 
                props.lobbyList?.map(lobby => <Lobby lobby={lobby} key={lobby.slug} />) :
                <h1 className="no-games">No matching games :(</h1>}

        </div>
    );
};


export { LobbyList };