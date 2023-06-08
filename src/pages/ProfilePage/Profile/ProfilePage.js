import { React, Suspense } from "react";
import axios from "axios";
import { redirect, useLoaderData, Await } from "react-router-dom";

import { UserInfo } from "../UserInfo/UserInfo";

import "./ProfilePage.css";


function ProfilePage(props) {
    
    const {userInfo} = useLoaderData();

    return (
        <div className="main-page">
            <Suspense fallback={<h1 className="suspense">Loading...</h1>}>
                <Await resolve={userInfo}>
                    {resolved => (
                        <UserInfo info={resolved} />
                    )}
                </Await>
            </Suspense>
        </div>
        )
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


async function updateInfo(formData) {
    const token = sessionStorage.getItem("auth_token");
    const username = sessionStorage.getItem("username");
    const baseURL = `http://127.0.0.1:8000/api/v1/auth/profile/${username}/`;
    const headers = {"Authorization": `Token ${token}`};

    if (formData.photo) headers['Content-Type'] = 'multipart/form-data';

    const response = await axios.patch(baseURL, formData, {headers: headers});
    
    if (response.statusText !== "OK") {
        throw new Response("", {status: response.status, statusText: "Bad request!"});
    };

    return response.data;
};


const userInfoLoader = async ({request}) => {
    const token = sessionStorage.getItem("auth_token");
    const splitURL = request.url.slice(0, request.url.length - 1).split("/");
    const usernameInURL = splitURL[splitURL.length - 1];

    if (!token) {
        return redirect(`/sign-in${usernameInURL === null ? `?next=/profile/${usernameInURL}` : ""}/`);
    };

    return {userInfo: getUserInfo(token, usernameInURL)};
};


async function profileAction({request}) {
    const formData = await request.formData();
    let inputData = {};

    if (formData.get("type") === "Update information") {
        inputData = {
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            email: formData.get("email"),
            mobile_number: formData.get("mobileNumber"),
        };
    
    } else if (formData.get("type") === "Update photo") {
        inputData = {photo: formData.get("photo")};
    };

    const updatedInfo = await updateInfo(inputData);

    return updatedInfo;
};


export { ProfilePage, userInfoLoader, profileAction };
