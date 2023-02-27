import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircle } from '@fortawesome/free-solid-svg-icons';

import { sendShot } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import "./Column.css";


function Column(props) {
    const isEnemyBoard = !props.isEnemyBoard && true;
    const isShipExists = props.ship && true;

    function takeShot(e) {
        const fieldName = e.target.attributes.name.value;
        sendShot(props.client, props.boardId, fieldName);
    };

    function dropHandler(e, fieldName) {
        e.preventDefault();
        props.dropShipOnBoard(fieldName);
    };

    function dragOverHandler(e, fieldName) {
        e.preventDefault();
        props.swipeOverFields(fieldName);
    };

    function dragLeaveHandler(e, fieldName) {
        props.leaveFields(fieldName);
    };

    return (
        <div className="column">
            {Object.keys(props.column).map((fieldName) => 
                <div 
                    key={fieldName}
                    name={fieldName} 
                    id={isEnemyBoard && ["miss", "hit"].indexOf(props.column[fieldName]) === -1 ? "field" : undefined} 
                    className={`field ${String(props.column[fieldName]).includes("space") ? "space-field" :
                        props.column[fieldName] && props.column[fieldName] !== "miss" && !isEnemyBoard ? "ship-field" :
                        "empty-field"}`}
                    onClick={isEnemyBoard && ["miss", "hit"].indexOf(props.column[fieldName]) === -1 ?
                        takeShot : undefined} 
                    onDrop={(e) => {isShipExists && dropHandler(e, fieldName)}}
                    onDragOver={(e) => {isShipExists && props.ship.count && dragOverHandler(e, fieldName)}}
                    onDragLeave={(e) => {isShipExists && dragLeaveHandler(e, fieldName)}}>
                    {props.column[fieldName] === "hit" && <FontAwesomeIcon icon={faXmark} className="x-mark" />}
                    {props.column[fieldName] === "miss" && <FontAwesomeIcon icon={faCircle} className="cirle" />}
                </div>
            )}
        </div>
    );
};


export {Column};