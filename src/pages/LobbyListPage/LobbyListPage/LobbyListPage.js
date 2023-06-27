import { Suspense } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation, Await, useLoaderData, redirect, useOutletContext, Navigate } from "react-router-dom";

import { refreshTokenRequest } from "../../../modules/requestsToBackend";

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
                    {resolved => {
                        if (resolved.status === 401) {
                            return <Navigate to={`/sign-in${`?next=/lobbies/`}`} />;
                        } else {
                            return <LobbyList 
                                        mainClient={outletContext.mainClient} 
                                        lobbyList={lobbies ? lobbies : resolved.data.results}
                                    />
                        };
                    }}
                </Await>
            </Suspense>
        </div>
    );
};


async function createLobby(formData) {
    const token = sessionStorage.getItem("auth_token");
    const response = await axios.post(
        "/lobbies/", formData, 
        {headers: {"Authorization": `${window.env.TYPE_TOKEN} ${token}`}}
        )
        .then(function(response) {
            return {lobbySlug: response.data.slug};
        })
        .catch(async function(error) {
            if (error.response.status === 401) {            
                if (error.response.data.detail === "Token expired.") {
                    const isRedirect = await refreshTokenRequest();
                    if (!isRedirect) {
                        return await createLobby(formData);
                    };
                };
            };
            return {errors: error.response.data};
        });

    return response;
};


async function getLobbyList(token, queryParams) {
    const response = await axios.get(
        `${window.env.BASE_URL}/lobbies/${queryParams ? "?" + queryParams : ""}`, 
        {headers: {"Authorization": `${window.env.TYPE_TOKEN} ${token}`}}
    ).then(function(response) {
        return response;
    }).catch(async function(error) {
        if (error.response.status === 401) {            
            if (error.response.data.detail === "Token expired.") {
                const isRedirect = await refreshTokenRequest();
                if (!isRedirect) {
                    return await getLobbyList(sessionStorage.getItem("auth_token"), queryParams);
                };
            };
        };
        return error.response;
    });

    return response;
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
