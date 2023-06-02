import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';

import { ProfileWindow } from "../../../components/ModalWindows/ProfileWindow/ProfileWindow";
import { defineProfileStateAction } from "../../../store/reducers/profileReducer";

import "./UserInfo.css";


function UserInfo(props) {
    const dispath = useDispatch();
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
    console.log(props.info);
    // console.log("Пофиксить useEffect, добавить ограничение")
    // console.log("Подкорректировать модальное окно, доделать все")
    // console.log("Проверить профиль и сделать экшен на сервер")
    useEffect(() => {
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
                    <label className="key">Username:</label>
                    <span className="value">{username}</span>
                </div>

                <div className="first-name">
                    <label className="key">First name:</label>
                    <span className="value" >{firstName || "None"}</span>
                </div>

                <div className="last-name">
                    <label className="key">Last name:</label>
                    <span className="value" >{lastName || "None"}</span>
                </div>

                <div className="email">
                    <label className="key">Email:</label>
                    <span className="value" >{email}</span>
                </div>

                <div className="mobile-number">
                    <label className="key">Mobile number:</label>
                    <span className="value" >{mobileNumber || "None"}</span>
                </div>

                {props.info.id &&<div className="cash">
                    <label className="key">Cash:</label>
                    <span className="value" >{cash} $</span>
                </div>}

                <div className="rating">
                    <label className="key">Rating:</label>
                    <span className="value" >
                        {rating}
                        <FontAwesomeIcon className="star" icon={faStar}/>
                    </span>
                </div>

                <div className="create-in">
                <label className="key">Created in:</label>
                    <span className="value" >{createdIn}</span>
                </div>

                <div className="update-in">
                    <label className="key">Updated in:</label>
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
            </div>}

            {typeModal && <ProfileWindow
                isProcessing={props.isProcessing}
                setTypeModal={setTypeModal}
                typeModal={typeModal}
                />}
        </div>
    );
};


export { UserInfo };
