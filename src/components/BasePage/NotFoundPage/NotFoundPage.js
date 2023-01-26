import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="notFoundPage">
            <b>This page doesn't exist. Go <Link to="/">home</Link></b>
        </div>
    );
};

export default NotFoundPage;