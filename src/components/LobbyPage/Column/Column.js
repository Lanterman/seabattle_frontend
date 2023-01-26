import { SetShipOnBoard } from "../../../modules/setShipLocation";
import { DefineColorField } from "../../../modules/defineColorField";

import "./Column.css";


function Column(props) {
    const column = JSON.parse(props.column.replace(/'/g, '"'))
    const isShoot = props.makeShoot && true;
    const setShipOnBoard = new SetShipOnBoard();
    const defineColorField = new DefineColorField();

    function makeShoot(e) {
        const fieldName = e.target.attributes.name.value;
        if (fieldName === "A1") {
            e.target.style.backgroundColor = "blue";
        } else {e.target.style.backgroundColor = "red"}
        column[fieldName] = "shoot";
        props.makeShoot(fieldName[0], column);
    };

    function dropHandler(e, fieldName) {
        e.preventDefault();
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size);
        if (fieldNameList.indexOf(null) === -1) {
            const updatedColumnByShip = setShipOnBoard.putShipOnBoard(fieldNameList, props.ship.name, column)
            // const updatedColumnBySpace = setShipOnBoard.defineSpaceFieldName(updatedColumnByShip);
            props.setUpdatedColumn(fieldName[0], updatedColumnByShip);
            e.target.style.background = "#4382f7";
        };
    };

    function dragOverHandler(e, fieldName) {
        e.preventDefault();
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size);
        fieldNameList.indexOf(null) === -1 ? 
        defineColorField.defineColorOverField(fieldNameList, props.updateColorShip) : 
            props.updateColorShip(false);
    };

    function dragLeaveHandler(e, fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size);
        fieldNameList.indexOf(null) === -1 && defineColorField.defineColorLeaveField(fieldNameList);
    }

    return (
            <div className="column">
            {Object.keys(column).map((fieldName) => 
                <div id={isShoot ? "field" : undefined} className="field" key={fieldName} name={fieldName} 
                    onClick={isShoot ? makeShoot : undefined} 
                    onDrop={(e) => {props.ship && dropHandler(e, fieldName)}}
                    onDragOver={(e) => {props.ship && dragOverHandler(e, fieldName)}}
                    onDragLeave={(e) => {props.ship && dragLeaveHandler(e, fieldName)}}>
                    {column[fieldName]}
                </div>
            )}
        </div>
    );
};


export {Column};