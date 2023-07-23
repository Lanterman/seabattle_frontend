import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';

import { ProfileWindow } from "../../../components/ModalWindows/ProfileWindow/ProfileWindow";
import { defineProfileStateAction } from "../../../store/reducers/profileReducer";

import "./UserInfo.css";


function UserInfo(props) {
    const dispath = useDispatch();
    const navigation = useNavigation();
    const [typeModal, setTypeModal] = useState(null);
    const username = useSelector(state => state.profile.username);
    const firstName = useSelector(state => state.profile.firstName);
    const lastName = useSelector(state => state.profile.lastName);
    const email = useSelector(state => state.profile.email);
    const mobileNumber = useSelector(state => state.profile.mobileNumber);
    const cash = useSelector(state => state.profile.cash);
    const rating = useSelector(state => state.profile.rating);
    const createdIn = useSelector(state => state.profile.createdIn);
    const updatedIn = useSelector(state => state.profile.updatedIn);
    const photo = useSelector(state => state.profile.photo);
    const isProcessing = ["submitting", "loading"].includes(navigation.state);
    
    sessionStorage.setItem("user_id", props.info.id)
    navigation.state === "loading" && !props.errors && typeModal && setTypeModal(null);

    useEffect(() => {
        (username !== props.info.username | props.info.updated_in !== updatedIn) && 
            dispath(defineProfileStateAction(props.info));
    });

    return (
        <div className="user-info">
            <div className="photo-block">
                {photo ? 
                    <img className="photo" src={photo} alt="None" /> :
                    <FontAwesomeIcon className="no-photo" icon={faUser}/>
                }
            </div>
            <div className="info">
                <div className="usename">
                    <span className="key">Username:</span>
                    <span className="value">{username}</span>
                </div>

                <div className="first-name">
                    <span className="key">First name:</span>
                    <span className="value" >{firstName || "None"}</span>
                </div>

                <div className="last-name">
                    <span className="key">Last name:</span>
                    <span className="value" >{lastName || "None"}</span>
                </div>

                <div className="email">
                    <span className="key">Email:</span>
                    <span className="value" >{email}</span>
                </div>

                <div className="mobile-number">
                    <span className="key">Mobile number:</span>
                    <span className="value" >{mobileNumber || "None"}</span>
                </div>

                {props.info.id && <div className="cash">
                    <span className="key">Cash:</span>
                    <span className="value" >{cash} $</span>
                </div>}

                <div className="rating">
                    <span className="key">Rating:</span>
                    <span className="value" >
                        {rating}
                        <FontAwesomeIcon className="star" icon={faStar}/>
                    </span>
                </div>

                <div className="create-in">
                <span className="key">Created in:</span>
                    <span className="value" >{createdIn}</span>
                </div>

                <div className="update-in">
                    <span className="key">Updated in:</span>
                    <span className="value" >{updatedIn || "None"}</span>
                </div>
            </div>
            {props.info.id && <div className="profile-buts">
                <input className="update" type="button" value="Update info" onClick={() => 
                    setTypeModal("Update information")}
                />
                <input className="update" type="button" value="Update photo" 
                    onClick={() => setTypeModal("Update photo")}
                />
                <input className="delete" type="button" value="Delete photo" 
                    onClick={() => setTypeModal("Delete photo")}
                />
                { sessionStorage.getItem("auth_token").indexOf(".oauth") < 0 &&
                    <input className="reset-password" type="button" value="Reset password" 
                        onClick={() => setTypeModal("Reset password")}
                    />
                }
            </div>}

            {typeModal && <ProfileWindow
                isProcessing={isProcessing}
                setTypeModal={setTypeModal}
                typeModal={typeModal}
                errors={props.errors}
                />}
        </div>
    );
};


export { UserInfo };
