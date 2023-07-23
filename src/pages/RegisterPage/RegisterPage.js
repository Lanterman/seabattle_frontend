import axios from "axios";
import { useState } from "react";
import { Link, Form, useActionData, useNavigation, redirect } from "react-router-dom";

import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";

import "./RegisterPage.css";


function RegisterPage(props) {
    const actionData = useActionData();
    const navigation = useNavigation();
    const [isBack, setIsBack] = useState(false);
    const token = sessionStorage.getItem("auth_token");
    const isActivated = sessionStorage.getItem("is_activated");
    const isProcessing = ["submitting", "loading"].includes(navigation.state);

    return isActivated ? 
        <NotFoundPage /> :
        (!token ? (
            <div className="main-page">
                <div className="register-page">
                    <p className="register-title">Sign up</p>
                    <Form className="sign-up" method="post">
                        <input name="type" readOnly value="create" type="hidden" />

                        {actionData?.errors?.non_field_errors && actionData?.errors.non_field_errors.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input placeholder="Username" required type="text" className="value"
                            name="username" minLength="5" maxLength="30" autoComplete="off" autoFocus
                        />
                        {actionData?.errors?.username && actionData?.errors.username.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input placeholder="First name" required type="text" className="value"
                            name="firstName" minLength="5" maxLength="30"
                        />
                        {actionData?.errors?.first_name && actionData?.errors.first_name.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input placeholder="Last name" required type="text" className="value"
                            name="lastName" minLength="5" maxLength="30"
                        />
                        {actionData?.errors?.last_name && actionData?.errors.last_name.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input placeholder="Email" required type="email" className="value" 
                            name="email" minLength="5" maxLength="30" autoComplete="off"
                        />
                        {actionData?.errors?.email && actionData?.errors.email.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input placeholder="Mobile number" required type="number" className="value"
                            name="mobileNumber" minLength="12" maxLength="20"
                        />
                        {actionData?.errors?.mobile_number && actionData?.errors.mobile_number.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input placeholder="Password" required type="password" className="value"
                            name="password1"
                        />
                        {actionData?.errors?.password1 && actionData?.errors.password1.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input placeholder="Confirm password" required type="password" className="value"
                            name="password2"
                        />
                        {actionData?.errors?.password2 && actionData?.errors.password2.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                        })}

                        <input type="submit" value="Sign up" className="submit-register" disabled={isProcessing}/>
                    </Form>

                    <div className="separation"></div>

                    <p className="login">
                        Do you already have an account? 
                        <Link to="/sign-in" className="login-link" >Sign in</Link>
                    </p>
                </div>
            </div>
            ) :
            (<div className="main-page">
                <p className="info-to-activate">
                    You have been sent an email with a link to verify your account. Please follow it.
                </p>
                <Form className="form" method="post">
                    <input name="type" readOnly type="hidden" value="activate"/>
                    <div className="reg-block">
                        <span className="label">Verification code: </span>
                        <input className={`value ${actionData?.errors?.detail ? "er-value" : ""}`} name="secretKey" 
                            required autoComplete="off"
                        />
                    </div>

                    {actionData?.errors?.detail && (
                        <li className="activate-error" >
                            {actionData?.errors?.detail}
                        </li>
                    )}

                        <div className="reg-button">
                           {typeof(isBack) === "boolean" && <input type="button" className="back" value="Back" 
                                onClick={() => {
                                    sessionStorage.removeItem("auth_token");
                                    sessionStorage.removeItem("user_id");
                                    sessionStorage.removeItem("username");
                                    sessionStorage.removeItem("refresh_token");
                                    setIsBack(true);
                                }}
                            />}
                            <input type="submit" className="submit" value="Send" disabled={props.isProcessing} />
                        </div>
                </Form>
            </div>));
};


async function registerUser(formData) {
    const response = await axios.post(`${window.env.BASE_URL}/auth/sign-up/`, formData)
        .then(function(response) {
            sessionStorage.setItem("auth_token", response.data.access_token);
            sessionStorage.setItem("user_id", response.data.user);
            sessionStorage.setItem("username", formData.username);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);
            // document.cookie = `refresh_token = ${response.data.refresh_token}`;
            return null;
            })
            .catch((function(response) {
                return {errors: response.response.data};
          }));

    return response;
};


async function activateAccount(secretKey) {
    const user_id = sessionStorage.getItem("user_id");

    const response = await axios.get(`${window.env.BASE_URL}/auth/activate_account/${user_id}/${secretKey}/`)
        .then(function(response) {
            sessionStorage.setItem("is_activated", true);
            return redirect("/")
            })
            .catch((function(response) {
              return {errors: response.response.data};
          }));

    return response;
};


async function registerUserAction({request}) {
    const formData = await request.formData();
    let response = {};

    if (formData.get("type") === "create") {
        const inputData = {
            username: formData.get("username"),
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            email: formData.get("email"),
            mobile_number: formData.get("mobileNumber"),
            password1: formData.get("password1"),
            password2: formData.get("password2"),
        };
        response = await registerUser(inputData);

    } else if (formData.get("type") === "activate") {
        response = await activateAccount(formData.get("secretKey"));
    };

    return response;
};


export { RegisterPage, registerUserAction };
