import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ImGoogle, ImGithub } from "react-icons/im";

import { ServerErrorException } from "../../modules/services";

import "./LoginPage.css";


function LoginPage(props) {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const redirectURL = useLocation().search?.slice(6);
    const ServerError = new ServerErrorException();

    if (!isAuth) {
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("is_activated", true);
        // document.cookie = "refresh_token=";
    }

    function setLogin(e) {
        e.preventDefault();
        axios.post('/auth/sign-in/', {username: username, password: password})
            .then(function(response) {
                sessionStorage.setItem("auth_token", response.data.access_token);
                sessionStorage.setItem("user_id", response.data.user);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("refresh_token", response.data.refresh_token);
                sessionStorage.setItem("is_activated", true);
                // document.cookie = `refresh_token = ${response.data.refresh_token}`;
                setIsAuth(true);
            })
            .catch((function(response) {
                if (response.response.status === 500) throw ServerError;
                setErrors(response.response.data);
          }));
    };

    return (
        <div className="main-page" >
            <div className="login-page">
                <p className="login-title">Sign in</p>
                <form className="sign-in" onSubmit={setLogin}>
                    {errors && errors.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input placeholder="Username" required type="text" className="value"
                        onChange={(e) => setUsername(e.target.value)} id="username" autoComplete="off"
                    />
                    <input placeholder="Password" required type="password" className="value"
                        onChange={(e) => setPassword(e.target.value)} id="password"
                    />
                    <input type="submit" value="Sign in" className="submit-login"/>
                </form>

                <div className="separation"></div>

                <div className="buttons">
                    <button className="button google">
                        <ImGoogle className="icon" />
                        <span className="value">Login with Google</span>
                    </button>

                    <button className="button github">
                        <ImGithub className="icon" />
                        <span className="value">Login with GitHub</span>
                    </button>
                </div>

                <p className="register">
                    Don't have an account? 
                    <Link to="/sign-up" className="register-link" >Sign up</Link>
                </p>
            </div>

            {isAuth && <Navigate to={redirectURL ? redirectURL : `/profile/${username}/`} />}
        </div>
    );
};


export { LoginPage };