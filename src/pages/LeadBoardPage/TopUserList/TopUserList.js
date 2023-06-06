import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';

import "./TopUserList.css";


function TopUserList(props) {

    return (
        <div className="top-users">
            {
                props.topUser.map((user, number) => (
                    <Link to={`/profile/${user.username}/`} 
                        className={`block-user ${number % 2 === 0 ? "odd" : "even"}`} 
                        key={number} >
                        <span className="number-user" >{number + 1}.</span>
                        <span className="username-user" >
                            {user.username.length <= 30 ? user.username : user.username.slice(0, 30) + `...`}
                        </span>
                        <span className="rating-user" >
                            {user.rating}
                            <FontAwesomeIcon className="star" icon={faStar}/>
                        </span>
                    </Link>
                ))
            }
        </div>
    );
};


export { TopUserList };