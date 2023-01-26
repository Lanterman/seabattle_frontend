import React from "react";

import FilterTable from "../FilterTable/FilterTable";
import SearchLobby from "../SearchLobby/SearchLobby";
import CreateLobby from "../CreateLobby/CreateLobby";
import { LobbyList, lobbyListLoader } from "../LobbyList/LobbyList";


function LobbyListPage(props) {

    return (
        <div className="main-page">
            <SearchLobby />
            <FilterTable />
            <CreateLobby />
            <LobbyList />
        </div>
    );
};


export { LobbyListPage, lobbyListLoader };
