import { Form } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUserEdit, faImage } from '@fortawesome/free-solid-svg-icons';

import "./ProfileWindow.css";


function ProfileWindow(props) {
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
        } else if (props.typeModal === "Reset password") {
            return faUserEdit;
        } else {
            return faImage;
        };
    };

    function getValueOfSubmitButton() {
        if (props.typeModal === "Delete photo") {
            return "Remove";
        } else if (props.typeModal === "Reset password") {
            return "Reset";
        } else {
            return "Update";
        };
    };

    return (
        <div className="wrap">
            <div className="modal-profile">
                <div className="modal-title">
                    <FontAwesomeIcon icon={getTitleIcon()} 
                        className={`question-icon ${["Delete photo", "Reset password"].includes(props.typeModal) ? "red" : "blue"}`}
                    />
                    <FontAwesomeIcon icon={faClose} className="close-icon" onClick={() => modalCloseHandler()} />
                    <p className="title">{props.typeModal}</p>
                </div>

                <Form className="form" method="patch" encType="multipart/form-data">
                    <input name="type" readOnly hidden value={props.typeModal}/>

                    {props.typeModal === "Update information" && 
                        <>
                            <div className="block">
                                <span className="label">First name:</span>
                                <input className="value-info" name="firstName" placeholder="First name" required
                                    defaultValue={firstName}
                                />
                            </div>
                            {props.errors?.first_name && props.errors.first_name.map((error, number) => {
                                return (<li key={number} className="error" >
                                    {error}
                                </li>)
                            })}

                            <div className="block">
                                <span className="label">Last name:</span>
                                <input className="value-info" name="lastName" placeholder="Last name" required
                                    defaultValue={lastName}
                                />
                            </div>
                            {props.errors?.last_name && props.errors.last_name.map((error, number) => {
                                return (<li key={number} className="error" >
                                    {error}
                                </li>)
                            })}

                            <div className="block">
                                <span className="label">Email:</span>
                                <input className="value-info" name="email" placeholder="Email" required
                                    defaultValue={email} type="email" autoComplete="off"
                                />
                            </div>
                            {props.errors?.email && props.errors.email.map((error, number) => {
                                return (<li key={number} className="error" >
                                    {error}
                                </li>)
                            })}

                            <div className="block">
                                <span className="label">Mobile number:</span>
                                <input className="value-info" name="mobileNumber" placeholder="Mobile number" required
                                    defaultValue={mobileNumber} type="number"
                                />
                            </div>
                            {props.errors?.mobile_number && props.errors.mobile_number.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                    })}
                        </>
                    }

                    {props.typeModal === "Update photo" && 
                        <div className="block">
                            <p className="recommendation">It is recommended to use photo 350x440!</p>
                            <p className="warning">Only JPEG, PNG, ICO files are accepted!!</p>
                            <input className="value-photo" name="photo" placeholder="Photo" required type="file" 
                                onChange={(e) => {
                                    const pathSplit = e.target.value.split(".");
                                    const button = document.getElementsByClassName("submit")[0];
                                    if (!["jpeg", "jpg", "png", "ico"].includes(pathSplit[pathSplit.length - 1])) {
                                        button.disabled = true;
                                    } else {
                                        if (button.disabled) button.disabled = false;
                                    };
                                }}
                            />
                        </div>
                    }

                    {props.typeModal === "Delete photo" && 
                        <div className="block">
                            <p className="accept">Do you really want to delete photo?</p>
                        </div>
                    }

                    {props.typeModal === "Reset password" && 
                        <>
                            <div className="block">
                                <span className="label">Old password:</span>
                                <input className="value-info" name="oldPassword" placeholder="Old password"
                                    required type="password"
                                />
                            </div>
                            {props.errors?.old_password && (
                                <li className="error" >
                                    {props.errors.old_password}
                                </li>)
                            }

                            <div className="block">
                                <span className="label">New password:</span>
                                <input className="value-info" name="newPassword" placeholder="New password"
                                    required type="password"
                                />
                            </div>
                            {props.errors?.new_password && props.errors.new_password.map((error, number) => {
                                return (<li key={number} className="error" >
                                    {error}
                                </li>)
                            })}

                            <div className="block">
                                <span className="label">Confirm password:</span>
                                <input className="value-info" name="confirmPassword" placeholder="Confirm password" 
                                    required type="password"
                                />
                            </div>
                            {props.errors?.confirm_password && props.errors.confirm_password.map((error, number) => {
                            return (<li key={number} className="error" >
                                {error}
                            </li>)
                            })}
                        </>
                    }

                    <div className="buttons">
                        <input type="button" className="back" value="Back"  onClick={() => modalCloseHandler()}/>
                        <input type="submit" className="submit" 
                            value={getValueOfSubmitButton()} 
                            disabled={props.isProcessing || (!photo && props.typeModal === "Delete photo")} 
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export { ProfileWindow };