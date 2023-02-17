import { Link } from "react-router-dom";
import "./RegisterPage.css";


function RegisterPage(props) {
    return (
        <div className="main-page">
            <h1>Register</h1>
            <p>My contacts</p>
            <p>My team</p>
            <Link to="/login" >Sign in</Link>
        </div>
    );
};


export { RegisterPage };
