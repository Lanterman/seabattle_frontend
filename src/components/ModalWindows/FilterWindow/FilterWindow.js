import { Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faAdd } from '@fortawesome/free-solid-svg-icons';

import "./CreateLobbyWindow.css";


function CreateLobbyWindow(props) {

    function modalCloseHandler() {
        props.setIsOpenModal(false);
    };

    return (
        <div className="wrap">
            <div className="modal-create">
                <div className="modal-title">
                    <FontAwesomeIcon icon={faAdd} className="question-icon"/>
                    <FontAwesomeIcon icon={faClose} className="close-icon" onClick={() => modalCloseHandler()} />
                    <p className="title">Create lobby</p>
                </div>
                <Form className="form" method="post">
                    <div className="block">
                        <span className="label">Name:</span>
                        <input className="value" name="name" placeholder="Name" required/>
                    </div>
                    
                    <div className="block">
                        <span className="label">Bet:</span>
                        <p className="value">
                            <select name="bet">
                                <option value="5">5$</option>
                                <option value="10">10$</option>
                                <option value="25">25$</option>
                                <option value="50">50$</option>
                                <option value="100">100$</option>
                                <option value="250">250$</option>
                                <option value="500">500$</option>
                                <option value="1000">1000$</option>
                            </select>
                        </p>
                    </div>

                    <div className="block">
                        <span className="label">Time to move:</span>
                        <p className="value">
                            <select name="timeToMove">
                                <option value="30">30 second</option>
                                <option value="60">60 second</option>
                                <option value="90">90 second</option>
                            </select>
                        </p>
                    </div>

                    <div className="block">
                        <span className="label">Time to placement:</span>
                        <p className="value">
                            <select name="timeToPlacement">
                                <option value="30">30 second</option>
                                <option value="60">60 second</option>
                                <option value="90">90 second</option>
                            </select>
                        </p>
                    </div>

                    <div className="block">
                        <span className="label">Password:</span>
                        <input className="value" name="password" placeholder="Password" type="password"/>
                    </div>

                    <div className="buttons">
                        <input type="button" className="back" value="Back"  onClick={() => modalCloseHandler()}/>
                        <input type="submit" className="submit" value="Create" disabled={props.isProcessing} />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export { CreateLobbyWindow };