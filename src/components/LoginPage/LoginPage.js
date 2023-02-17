import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useLocation } from "react-router-dom";

import "./LoginPage.css";


function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const redirectURL = useLocation().search?.slice(6);

    function setLogin(e) {
        e.preventDefault();
        axios.post('auth/login/', {username: username, password: password})
            .then(function(response) {
                sessionStorage.setItem("auth_token", response.data.key);
                sessionStorage.setItem("user_id", response.data.user);
                setIsAuth(true);
            })
            .catch((function(response) {
              console.log(response.message);
          }));
    };

    return (
        <form className="main-page" onSubmit={setLogin}>
            <input placeholder="username" required type="text" onChange={(e) => setUsername(e.target.value)}/>
            <input placeholder="password" required type="password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" value="sign-in"/>
            {isAuth && <Navigate to={redirectURL ? redirectURL : "/"} />}

            <Link to="/register" >Sign on</Link>
        </form>
    );
};


export { LoginPage };