import axios from "axios";
import { Link, Form, redirect, useActionData } from "react-router-dom";

import "./RegisterPage.css";


function RegisterPage(props) {
    const errors = useActionData();

    return (
        <div className="main-page">
            <div className="register-page">
                <p className="register-title">Sign up</p>
                <Form className="sign-up" method="post">
                    {errors?.non_field_errors && errors.non_field_errors.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}
                    <input placeholder="Username" required type="text" className="value"
                        name="username" minLength="5" maxLength="30" autoComplete="off"
                    />
                    {errors?.username && errors.username.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input placeholder="First name" required type="text" className="value"
                        name="firstName" minLength="5" maxLength="30"
                    />
                    {errors?.first_name && errors.first_name.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input placeholder="Last name" required type="text" className="value"
                        name="lastName" minLength="5" maxLength="30"
                    />
                    {errors?.last_name && errors.last_name.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input placeholder="Email" required type="email" className="value"
                        name="email" minLength="5" maxLength="30" autoComplete="off"
                    />
                    {errors?.email && errors.email.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input placeholder="Mobile number" required type="number" className="value"
                        name="mobileNumber" minLength="12" maxLength="20"
                    />
                    {errors?.mobile_number && errors.mobile_number.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input placeholder="Password" required type="password" className="value"
                        name="password1"
                    />
                    {errors?.password1 && errors.password1.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input placeholder="Confirm password" required type="password" className="value"
                        name="password2"
                    />
                    {errors?.password2 && errors.password2.map((error, number) => {
                        return (<li key={number} className="error" >
                            {error}
                        </li>)
                    })}

                    <input type="submit" value="Sign up" className="submit-register"/>
                </Form>

                <div className="separation"></div>

                <p className="login">
                    Do you already have an account? 
                    <Link to="/sign-in" className="login-link" >Sign in</Link>
                </p>
            </div>
        </div>
    );
};


async function registerUser(formData) {
    const response = await axios.post('/auth/sign-up/', formData)
        .then(function(response) {
            sessionStorage.setItem("auth_token", response.data.key);
            sessionStorage.setItem("user_id", response.data.user);
            sessionStorage.setItem("username", formData.username);
            return redirect(`/profile/${formData.username}/`);
            })
            .catch((function(response) {
              return response.response.data
          }));

    return response
};


async function registerUserAction({request}) {
    const formData = await request.formData();
    const inputData = {
        username: formData.get("username"),
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        email: formData.get("email"),
        mobile_number: formData.get("mobileNumber"),
        password1: formData.get("password1"),
        password2: formData.get("password2"),
    };

    const response = await registerUser(inputData);
    return response;
};


export { RegisterPage, registerUserAction };
