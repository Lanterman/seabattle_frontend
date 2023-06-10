import { Suspense } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation, Await, useLoaderData, redirect, useOutletContext } from "react-router-dom";

import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import CreateLobby from "../CreateLobby/CreateLobby";
import { LobbyList } from "../LobbyList/LobbyList";


import "./LobbyListPage.css";


function LobbyListPage(props) {
    const navigation = useNavigation();
    const {lobbyList} = useLoaderData();
    const outletContext = useOutletContext();
    const lobbies = useSelector(state => state.lobbyList.lobbyList);

    return (
        <div className="main-page">
            <div className="settings">
                <Search />
                <Filter isProcessing={navigation.state === "loading"} />
                <CreateLobby isProcessing={["submitting", "loading"].includes(navigation.state)}/>
            </div>
            <Suspense fallback={<h1 className="suspense">Loading...</h1>}>
                <Await resolve={lobbyList}>
                    {resolved => (
                        <LobbyList 
                            mainClient={outletContext.mainClient} 
                            lobbyList={lobbies ? lobbies : resolved.results}
                            />
                    )}
                </Await>
            </Suspense>
        </div>
    );
};


async function createLobby(formData) {
    const token = sessionStorage.getItem("auth_token");
    const response = await axios.post("lobbies/", formData, {headers: {"Authorization": `Token ${token}`}})
        .then(function(response) {
            return {lobbySlug: response.data.slug};
        })
        .catch(function(response) {
            return {errors: response.response.data};
        });

    return response;
};


async function getLobbyList(token, queryParams) {
    const baseURL = "http://127.0.0.1:8000/api/v1/lobbies";
    const response = await axios.get(
        `${baseURL}/${queryParams ? "?" + queryParams : ""}`, 
        {headers: {"Authorization": `Token ${token}`}}
    ).then(function(response) {
        return response;
    }).catch(function(response) {
        console.log(response);
    });

    return response.data;
};


const lobbyListLoader = async ({request}) => {
    const token = sessionStorage.getItem("auth_token");
    const queryParams = request.url.split("?")[1];

    if (!token) {
        return redirect("/sign-in?next=/lobbies");
    };

    return {lobbyList: getLobbyList(token, queryParams)};
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
    return slugOfNewLobby;
};


export { LobbyListPage, lobbyListLoader, lobbyAction };
