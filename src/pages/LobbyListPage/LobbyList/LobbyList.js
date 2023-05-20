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
    const lobbyList = props.lobbyList;

    useEffect(() => {
        if (mainAction && mainAction !== displayWsResult._lobbySlug) {
            sendNotifCreatedGame(props.mainClient, mainAction);
            displayWsResult._lobbySlug = mainAction;
        };

        props.mainClient.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.type === "created_game") {
                if (["/lobbies/", "/lobbies"].includes(window.location.pathname)) {
                    dispath(setLobbyList([...lobbyList, data.lobby]));
                };

            } else if (data.type === "deleted_game") {
                if (["/lobbies/", "/lobbies"].includes(window.location.pathname)) {
                    lobbyList.map((lobby, number) => {
                        console.log(lobby["id"], data)
                        if (lobby["id"] === data.lobby_id) {
                            console.log(lobby)
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

            {mainAction && <Navigate to={`/lobbies/${mainAction}`} />}

            {props.lobbyList.length ? 
                props.lobbyList?.map(lobby => <Lobby lobby={lobby} key={lobby.slug} />) :
                <h1 className="no-games">No matching games :(</h1>}

        </div>
    );
};


export { LobbyList };