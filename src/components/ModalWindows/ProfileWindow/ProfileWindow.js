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
                                    defaultValue={email} type="email"
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

                    <div className="buttons">
                        <input type="button" className="back" value="Back"  onClick={() => modalCloseHandler()}/>
                        <input type="submit" className="submit" 
                            value={props.typeModal === "Delete photo" ? "Remove" : "Update"} 
                            disabled={props.isProcessing || (!photo && props.typeModal === "Delete photo")} 
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export { ProfileWindow };