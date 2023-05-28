import { React, Suspense } from "react";
import axios from "axios";
import { Navigate, redirect, useLoaderData, Await } from "react-router-dom";

import "./ProfilePage.css";


function ProfilePage(props) {
    
    const token = sessionStorage.getItem("auth_token");
    // const myUsername = sessionStorage.getItem("username");
    const {userInfo} = useLoaderData();

    return token ? (
        <div className="profile">
            <p>Profile</p>
            <Suspense fallback={<h1 className="suspense">Loading...</h1>}>
                <Await resolve={userInfo}>
                    {resolved => (
                        console.log(resolved)
                    )}
                </Await>
            </Suspense>
        </div>
        ):
        <Navigate to="/login"/>
};


async function getUserInfo(token, username) {
    const baseURL = "http://127.0.0.1:8000/api/v1";
    const response = await axios.get(
        `${baseURL}/auth/profile/${username}/`, 
        {headers: {"Authorization": `Token ${token}`}}
    );

    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Not found"});
    };

    return response.data;
};


const userInfoLoader = async ({request}) => {
    const token = sessionStorage.getItem("auth_token");
    const splitURL = request.url.slice(0, request.url.length - 1).split("/");
    const usernameInURL = splitURL[splitURL.length - 1];

    if (!token) {
        return redirect(`/login?next=/profile/${usernameInURL}/`);
    };

    return {userInfo: getUserInfo(token, usernameInURL)};
};


export { ProfilePage, userInfoLoader };
