import React from "react";
import axios from "axios";
import { redirect, useNavigation } from "react-router-dom";

import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import CreateLobby from "../CreateLobby/CreateLobby";
import { LobbyList, lobbyListLoader } from "../LobbyList/LobbyList";

import "./LobbyListPage.css";


function LobbyListPage(props) {
    const navigation = useNavigation();

    return (
        <div className="main-page">
            <div className="settings">
                <Search />
                <Filter isProcessing={navigation.state === "loading"} />
                <CreateLobby isProcessing={["submitting", "loading"].includes(navigation.state)}/>
            </div>
            <LobbyList />
        </div>
    );
};


async function createLobby(formData) {
    const token = sessionStorage.getItem("auth_token");
    const baseURL = "http://127.0.0.1:8000/api/v1/lobbies/";
    const response = await axios.post(baseURL, formData, {headers: {"Authorization": `Token ${token}`}});

    if (response.statusText !== "Created") {
        throw new Response("", {status: response.status, statusText: "Bad request!"});
    };

    return response.data.slug;
};


async function lobbyAction({request}) {
    const formData = await request.formData();
    const inputData = {
        name: formData.get("name"),
        bet: formData.get("bet"),
        time_to_move: formData.get("timeToMove"),
        time_to_placement: formData.get("timeToPlacement"),
        password: formData.get("password"),
    };
    
    const slugOfNewLobby = await createLobby(inputData)
    return redirect(`/lobbies/${slugOfNewLobby}/`);
};


export { LobbyListPage, lobbyListLoader, lobbyAction };
