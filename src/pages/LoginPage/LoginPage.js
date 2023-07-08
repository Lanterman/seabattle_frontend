import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, useLocation, useOutletContext } from "react-router-dom";
import { ImGithub } from "react-icons/im";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from 'gapi-script';

import { ServerErrorException } from "../../modules/services";

import "./LoginPage.css";


function LoginPage(props) {
    const outletContext = useOutletContext();
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const redirectURL = useLocation().search?.slice(6);
    const ServerError = new ServerErrorException();

    if (!isAuth) {
        sessionStorage.clear();
        // document.cookie = "refresh_token=";x
    }

    if (outletContext.mainClient.readyState) {
        outletContext.mainClient.close();
    };

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: window.env.GOOGLE_CLIENT_ID,
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);

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

    function authWithGitHub() {
        axios.get(
            `https://github.com/login/oauth/authorize?client_id=${window.env.GITHUB_CLIENT_ID}`,
            {headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": 'application/json',
                "Content-Type": "application/json"
            }, withCredentials: true}
            )
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    const onSuccess = async (res) => {
        const user = {
              "grant_type":"convert_token",
              "client_id":window.env.DRF_GOOGLE_CLIENT_ID,
              "client_secret": window.env.DRF_GOOGLE_SECRET_KEY,
              "backend":"google-oauth2",
              "token": res.accessToken
            };

            const data = await axios.post('http://127.0.0.1:8000/auth/convert-token/', user ,{headers: {
                'Content-Type': 'application/json'
            }}, {withCredentials: true});
            console.log(data)
            sessionStorage.clear();
            sessionStorage.setItem('username', res.profileObj.email.split("@")[0]);
            sessionStorage.setItem('auth_token', `${data.data.access_token}.oauth`);
            sessionStorage.setItem('refresh_token', data.data.refresh_token);
            sessionStorage.setItem("is_activated", true);
            // document.cookie = `refresh_token = ${data.data.refresh_token}`;
            setIsAuth(true);
      }

      const onFailure = (err) => {
        console.log('failed:', err);
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
                    <GoogleLogin className="button google"
                        clientId={window.env.GOOGLE_CLIENT_ID}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                    />

                    <button className="button github" onClick={() => authWithGitHub()}>
                        <ImGithub className="icon" />
                        <span className="value">Login with GitHub</span>
                    </button>
                </div>

                <p className="register">
                    Don't have an account? 
                    <Link to="/sign-up" className="register-link" >Sign up</Link>
                </p>
            </div>

            {isAuth && <Navigate to={redirectURL ? redirectURL : `/profile/${username ? username : sessionStorage.getItem("username")}/`} />}
        </div>
    );
};


export { LoginPage };