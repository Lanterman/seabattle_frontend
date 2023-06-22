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
    const response = await axios.get(
        window.env.BASE_URL + "/leadboard/", 
        {headers: {"Authorization": `${window.env.TYPE_TOKEN} ${token}`}}
    );

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"});
    };

    return response.data.results;
};


async function getTopUserListLoader() {
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
        return redirect(`/sign-in?next=/leadboard/`);
    };

    return {topUserList: getTopUserList(token)};
};


export { LeadBoardPage, getTopUserListLoader };