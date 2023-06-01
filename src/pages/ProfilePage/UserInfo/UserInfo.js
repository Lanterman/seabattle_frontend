import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';

import "./UserInfo.css";


function UserInfo(props) {

    return (
        <div className="user-info">
            <div className="photo-block">
                {props.info.photo ? 
                    <img className="photo" src={props.info.photo} alt="None" /> :
                    <FontAwesomeIcon className="no-photo" icon={faUser}/>
                }
            </div>
            <div className="info">
                <div className="usename">
                    <label className="key">Username:</label>
                    <span className="value">{props.info.username}</span>
                </div>

                <div className="first-name">
                    <label className="key">First name:</label>
                    <span className="value" >{props.info.first_name}</span>
                </div>

                <div className="last-name">
                    <label className="key">Last name:</label>
                    <span className="value" >{props.info.last_name}</span>
                </div>

                <div className="email">
                    <label className="key">Email:</label>
                    <span className="value" >{props.info.email}</span>
                </div>

                <div className="mobile-number">
                    <label className="key">Mobile number:</label>
                    <span className="value" >{props.info.mobile_number || "None"}</span>
                </div>

                {props.info.id &&<div className="cash">
                    <label className="key">Cash:</label>
                    <span className="value" >{props.info.cash} $</span>
                </div>}

                {props.info.id &&<div className="rating">
                    <label className="key">Rating:</label>
                    <span className="value" >
                        {props.info.rating}
                        <FontAwesomeIcon className="star" icon={faStar}/>
                    </span>
                </div>}

                <div className="create-in">
                <label className="key">Created in:</label>
                    <span className="value" >{props.info.created_in || "None"}</span>
                </div>

                <div className="update-in">
                    <label className="key">Updated in:</label>
                    <span className="value" >{props.info.updated_in || "None"}</span>
                </div>
            </div>
            {props.info.id && <div className="profile-buts">
                <input className="update" type="button" value="Update photo" />
                <input className="delete" type="button" value="Delete photo" />
            </div>}
        </div>
    );
};


export { UserInfo };
