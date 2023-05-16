import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faAdd } from '@fortawesome/free-solid-svg-icons';

import { setBetMaxAction, setBetMinAction, setTimeToMoveMaxAction, setTimeToMoveMinAction, 
    setTimeToPlacementMaxAction, setNameAction, setIsPrivateAction, 
    setTimeToPlacementMinAction } from "../../../store/reducers/lobbyListReducer";

import "./FilterWindow.css";


function FilterWindow(props) {

    const dispath = useDispatch();
    const name = useSelector(state => state.lobbyList.name);
    const betMax = useSelector(state => state.lobbyList.betMax);
    const betMin = useSelector(state => state.lobbyList.betMin);
    const timeToMoveMax = useSelector(state => state.lobbyList.timeToMoveMax);
    const timeToMoveMin = useSelector(state => state.lobbyList.timeToMoveMin);
    const timeToPlacementMax = useSelector(state => state.lobbyList.timeToPlacementMax);
    const timeToPlacementMin = useSelector(state => state.lobbyList.timeToPlacementMin);
    const isPrivate = useSelector(state => state.lobbyList.isPrivate);

    function modalCloseHandler() {
        props.setIsOpenModal(false);
    };

    return (
        <div className="wrap">
            <div className="modal-filter">
                <div className="modal-title">
                    <FontAwesomeIcon icon={faAdd} className="question-icon"/>
                    <FontAwesomeIcon icon={faClose} className="close-icon" onClick={() => modalCloseHandler()} />
                    <p className="title">Filter</p>
                </div>
                <Form className="form" method="post" action="/lobbies/">
                    <input name="type" readOnly hidden value="filter"/>

                    <div className="block">
                        <span className="label">Name:</span>
                        <input className="value" name="name" placeholder="Name" value={name}
                            onChange={(e) => dispath(setNameAction(e.target.value))}
                            />
                    </div>

                    <div className="block">
                        <span className="label">Bet:</span>
                        <input className="max-value" type="number" min="5" max="1000" placeholder="Max" name="betMax"
                            value={betMax} onChange={(e) => dispath(setBetMaxAction(e.target.value))}
                            />
                        <span className="separate">-</span>
                        <input className="min-value" type="number" min="0" max="1000" placeholder="Min" name ="betMin"
                            value={betMin} onChange={(e) => dispath(setBetMinAction(e.target.value))}
                            />
                    </div>

                    <div className="block">
                        <span className="label">Time to move:</span>
                        <input className="max-value" type="number" min="30" max="90" placeholder="Max" 
                            name="timeToMoveMax" value={timeToMoveMax} 
                            onChange={(e) => dispath(setTimeToMoveMaxAction(e.target.value))}
                            />
                        <span className="separate">-</span>
                        <input className="min-value" type="number" min="0" max="90" placeholder="Min" 
                            name="timeToMoveMin" value={timeToMoveMin} 
                            onChange={(e) => dispath(setTimeToMoveMinAction(e.target.value))} 
                            />
                    </div>

                    <div className="block">
                        <span className="label">Time to placement:</span>
                        <input className="max-value" type="number" min="30" max="90" placeholder="Max" 
                            name="timeToPlacementMax" value={timeToPlacementMax} 
                            onChange={(e) => dispath(setTimeToPlacementMaxAction(e.target.value))}
                            />
                        <span className="separate">-</span>
                        <input className="min-value" type="number" min="0" max="90" placeholder="Min" 
                            name="timeToPlacementMin" value={timeToPlacementMin} 
                            onChange={(e) => dispath(setTimeToPlacementMinAction(e.target.value))}
                            />
                    </div>

                    <div className="block">
                        <span className="label">Private:</span>
                        <label className="password-label">
                            Yes
                            <input className="radio-value" name="isPrivate" type="radio" value={true} id="yes" 
                                defaultChecked={isPrivate === "yes"} 
                                onChange={(e) => dispath(setIsPrivateAction("yes"))}
                            />
                        </label>
                        <label className="password-label">
                            No
                            <input className="radio-value" name="isPrivate" type="radio" value={false} id="no" 
                                defaultChecked={isPrivate === "no"} 
                                onChange={(e) => dispath(setIsPrivateAction("no"))}
                            />
                        </label>
                        <label className="password-label">
                            Both
                            <input className="radio-value" name="isPrivate" type="radio" value="" id="both" 
                                defaultChecked={isPrivate === "both"} 
                                onChange={(e) => dispath(setIsPrivateAction("both"))}
                            />
                        </label>
                    </div>
                    
                    <div className="buttons">
                        <input type="button" className="back" value="Back" onClick={() => modalCloseHandler()}/>
                        <input type="submit" className="submit" value="Submit" disabled={props.isProcessing} />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export { FilterWindow };