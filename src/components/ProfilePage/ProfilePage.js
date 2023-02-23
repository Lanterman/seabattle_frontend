import { React } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import "./ProfilePage.css";


function ProfilePage(props) {
    
    const token = sessionStorage.getItem("auth_token");
    const username = sessionStorage.getItem("username");

    function get_info() {
        console.log(token)
        axios.get(`/auth/${username}/`, {headers: {"Authorization": `Token ${token}`}})
        .then(response => {console.log(response.data)});
    };

    return token ? (
        <div className="profile">
            <p>Profile</p>
            {get_info()}
        </div>
        ):
        <Navigate to="/login"/>
};

export default ProfilePage;
