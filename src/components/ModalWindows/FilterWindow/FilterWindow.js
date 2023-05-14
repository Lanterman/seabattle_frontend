import { Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faAdd } from '@fortawesome/free-solid-svg-icons';

import "./FilterWindow.css";
import { useEffect } from "react";


function FilterWindow(props) {

    function modalCloseHandler() {
        props.setIsOpenModal(false);
    };

    useEffect(() => {
        const rangeInput = document.querySelectorAll(".range-input input");
        const progress = document.querySelector(".slider .progress");

        rangeInput.forEach(input => {
            input.addEventListener("input", () => {
                let minBet = parseInt(rangeInput[0].value);
                let maxBet = parseInt(rangeInput[1].value);

                progress.style.left = (minBet / rangeInput[0].max) * 100 + "%";
                progress.style.right = 100 - (maxBet / rangeInput[1].max) * 100 + "%";
            });
        });
    });

    return (
        <div className="wrap">
            <div className="modal-filter">
                <div className="modal-title">
                    <FontAwesomeIcon icon={faAdd} className="question-icon"/>
                    <FontAwesomeIcon icon={faClose} className="close-icon" onClick={() => modalCloseHandler()} />
                    <p className="title">Filter</p>
                </div>
                <Form className="form" method="post">
                    <input name="type" readOnly hidden value="filter"/>
                    <div className="block">
                        <span className="label">Name:</span>
                        <input className="value" name="name" placeholder="Name"/>
                    </div>

                    <div className="block">
                        <span className="label">Bet:</span>
                        <input className="max-value" type="number" min="5" max="1000" placeholder="Max" name="betMax"/>
                        <span className="separate">-</span>
                        <input className="min-value" type="number" min="0" max="1000" placeholder="Min" name ="betMin"/>
                    </div>

                    <div className="block">
                        <span className="label">Time to move:</span>
                        <input className="max-value" type="number" min="30" max="90" placeholder="Max" name="timeToMoveMax"/>
                        <span className="separate">-</span>
                        <input className="min-value" type="number" min="0" max="90" placeholder="Min" name="timeToMoveMin"/>
                    </div>

                    <div className="block">
                        <span className="label">Time to placement:</span>
                        <input className="max-value" type="number" min="30" max="90" placeholder="Max" name="timeToPlacementMax"/>
                        <span className="separate">-</span>
                        <input className="min-value" type="number" min="0" max="90" placeholder="Min" name="timeToPlacementMin"/>
                    </div>

                    <div className="block">
                        <span className="label">Private:</span>
                        <label className="password-label">
                            Yes
                            <input className="radio-value" name="isPrivate" type="radio" value={true} id="yes"/>
                        </label>
                        <label className="password-label">
                            No
                            <input className="radio-value" name="isPrivate" type="radio" value={false} id="no"/>
                        </label>
                        <label className="password-label">
                            Both
                            <input className="radio-value" name="isPrivate" type="radio" value="" id="none"/>
                        </label>
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

export { FilterWindow };