import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUserEdit, faImage } from '@fortawesome/free-solid-svg-icons';

import { setFirstNameAction, setLastNameAction, setEmailAction, setMobileNumberAction,
    setPhotoAction } from "../../../store/reducers/profileReducer";

import "./ProfileWindow.css";


function ProfileWindow(props) {
    const dispath = useDispatch();
    const firstName = useSelector(state => state.profile.firstName);
    const lastName = useSelector(state => state.profile.lastName);
    const email = useSelector(state => state.profile.email);
    const mobileNumber = useSelector(state => state.profile.mobileNumber);
    const photo = useSelector(state => state.profile.photo);

    function modalCloseHandler() {
        props.setTypeModal(null);
    };

    function getTitleIcon() {
        if (props.typeModal === "Update information") {
            return faUserEdit;
        } else {
            return faImage;
        };
        
    };

    return (
        <div className="wrap">
            <div className="modal-profile">
                <div className="modal-title">
                    <FontAwesomeIcon icon={getTitleIcon()} 
                        className={`question-icon ${props.typeModal === "Delete photo" ? "red" : "blue"}`}
                    />
                    <FontAwesomeIcon icon={faClose} className="close-icon" onClick={() => modalCloseHandler()} />
                    <p className="title">{props.typeModal}</p>
                </div>

                <Form className="form" method="post">
                    <input name="type" readOnly hidden value={props.typeModal}/>
                    
                    {props.typeModal === "Update information" && 
                        <>
                            <div className="block">
                                <span className="label">First name:</span>
                                <input className="value" name="first-name" placeholder="First name" required
                                    defaultValue={firstName}
                                    onChange={(e) => dispath(setFirstNameAction(e.target.value))}
                                />
                            </div>

                            <div className="block">
                                <span className="label">Last name:</span>
                                <input className="value" name="last-name" placeholder="Last name" required
                                    defaultValue={lastName}
                                    onChange={(e) => dispath(setLastNameAction(e.target.value))}
                                />
                            </div>

                            <div className="block">
                                <span className="label">Email:</span>
                                <input className="value" name="email" placeholder="Email" required
                                    defaultValue={email}
                                    onChange={(e) => dispath(setEmailAction(e.target.value))}
                                />
                            </div>

                            <div className="block">
                                <span className="label">Mobile number:</span>
                                <input className="value" name="mobile-number" placeholder="Mobile number" required
                                    defaultValue={mobileNumber}
                                    onChange={(e) => dispath(setMobileNumberAction(e.target.value))}
                                />
                            </div>
                        </>
                    }
                    <div className="buttons">
                        <input type="button" className="back" value="Back"  onClick={() => modalCloseHandler()}/>
                        <input type="submit" className="submit" 
                            value={props.typeModal === "Delete photo" ? "Remove" : "Update"} 
                            disabled={props.isProcessing} 
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export { ProfileWindow };