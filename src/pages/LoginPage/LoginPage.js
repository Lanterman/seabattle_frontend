import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ImGoogle, ImGithub } from "react-icons/im";

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
                sessionStorage.setItem("username", username);
                setIsAuth(true);
            })
            .catch((function(response) {
              console.log(response.message);
          }));
    };

    return (
        <div className="main-page" >
            <div className="login-page">
                <p className="login-title">Sign in</p>
                <form className="sign-in" onSubmit={setLogin}>
                    <input placeholder="Username" required type="text" className="value"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input placeholder="Password" required type="password" className="value"
                        onChange={(e) => setPassword(e.target.value)}
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
                    <Link to="/register" className="register-link" >Sign up</Link>
                </p>
            </div>

            {isAuth && <Navigate to={redirectURL ? redirectURL : `/profile/${username}/`} />}
        </div>
    );
};


export { LoginPage };