import axios from "axios";
import { React, Suspense } from "react";
import { useSelector } from "react-redux";
import { redirect, useLoaderData, Await, useActionData, Navigate } from "react-router-dom";

import { refreshTokenRequest } from "../../../modules/requestsToBackend";

import { UserInfo } from "../UserInfo/UserInfo";
import { SidePanel } from "../SidePanel/SidePanel";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";

import "./ProfilePage.css";


function ProfilePage(props) {
    const {userInfo} = useLoaderData();
    const actionData = useActionData();
    const pageUsername = useSelector(state => state.profile.username);
    const ownUsername = sessionStorage.getItem("username");

    return (
        <div className="main-page">
            <Suspense fallback={<h1 className="suspense">Loading...</h1>}>
                <Await resolve={userInfo}>
                    {resolved => {
                        if (resolved.status === 401) {
                            const splitPathname = window.location.pathname.split("/");
                            const usernameToURL = splitPathname[splitPathname.length - 2];
                            const redirectURL = `/sign-in${usernameToURL !== [] ? `?next=/profile/${usernameToURL}` : ""}/`;
                            return <Navigate to={redirectURL} />;
                        } else if (resolved.status === 404) {
                            return <NotFoundPage />;
                        } else {
                            return <UserInfo info={resolved.data} 
                                        errors={actionData?.status === 400 ? actionData.data : ""}
                                   />;
                        };
                    }}
                </Await>
            </Suspense>
            {pageUsername === ownUsername && <SidePanel />}
        </div>
        )
};


async function getUserInfo(token, username) {
    const response = await axios.get(
        `${window.env.BASE_URL}/auth/profile/${username}/`, 
        {headers: {"Authorization": `${window.env.TYPE_TOKEN} ${token}`}}
        )
        .then(function(response) {
            return response;
        })
        .catch((async function(error) {
            if (error.response.status === 401) {            
                if (error.response.data.detail === "Token expired.") {
                    const isRedirect = await refreshTokenRequest();
                    if (!isRedirect) {
                        return await getUserInfo(sessionStorage.getItem("auth_token"), username);
                    };
                };
            };
            return error.response;
        }));

    return response;
};

async function updateInfo(method, formData) {
    const token = sessionStorage.getItem("auth_token");
    const username = sessionStorage.getItem("username");
    const headers = {"Authorization": `${window.env.TYPE_TOKEN} ${token}`};
    let url = `/auth/profile/${username}/`;

    if (formData?.new_password) url += "reset_password/";
    if (formData.photo) headers['Content-Type'] = 'multipart/form-data';

    const response = await axios[method](url, formData, {headers: headers})
        .then(function(response) {
            return response.data;
        })
        .catch((async function(error) {
            if (error.response.status === 401) {            
                if (error.response.data.detail === "Token expired.") {
                    const isRedirect = await refreshTokenRequest();
                    if (!isRedirect) {
                        return await updateInfo(formData);
                    };
                };
            };
            return error.response;
        }));

    return response;
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
    let method = "patch";
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
    
    } else if (formData.get("type") === "Reset password") {
        method = "put"
        inputData = {
            old_password: formData.get("oldPassword"),
            new_password: formData.get("newPassword"),
            confirm_password: formData.get("confirmPassword"),
        };
    };

    const updatedInfo = await updateInfo(method, inputData);

    return updatedInfo;
};


export { ProfilePage, userInfoLoader, profileAction };
