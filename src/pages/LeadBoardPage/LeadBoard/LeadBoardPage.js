import axios from "axios";
import { React, Suspense } from "react";
import { Navigate, redirect, useLoaderData, Await } from "react-router-dom";

import { TopUserList } from "../TopUserList/TopUserList";

import "./LeadBoardPage.css";



function LeadBoardPage(props) {
    const {topUserList} = useLoaderData();
    const token = sessionStorage.getItem("auth_token");

    return (
        token ? (
            <div className="main-page">
                <h1 className="title-board">Leader board</h1>
                <Suspense fallback={<h1 className="suspense">Loading...</h1>}>
                    <Await resolve={topUserList}>
                        {resolved => (
                            <TopUserList topUser={resolved} />
                        )}
                    </Await>
                </Suspense>
            </div>
            ):
            <Navigate to="/login"/>
    );
};


async function getTopUserList(token) {
    const baseURL = "http://127.0.0.1:8000/api/v1/leadboard/";
    const response = await axios.get(baseURL, {headers: {"Authorization": `Token ${token}`}});

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"});
    };

    return response.data.results;
};


async function getTopUserListLoader() {
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
        return redirect(`/login?next=/leadboard/`);
    };

    return {topUserList: getTopUserList(token)};
};


export { LeadBoardPage, getTopUserListLoader };