import { SetShipOnBoard } from "../../../modules/setShipLocation";
import { DefineColorField } from "../../../modules/defineColorField";

import { Column } from "../Column/Column";

import "./Board.css"


function Board(props) {
    const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const userTable = props.board.user_id
    const setShipOnBoard = new SetShipOnBoard();
    const defineColorField = new DefineColorField();

    function dropShipOnBoard(fieldName, column) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size);
        if (fieldNameList.indexOf(null) === -1) {
            const updatedColumnByShip = setShipOnBoard.putShipOnBoard(fieldNameList, props.ship.name, column)
            const updatedColumnBySpace = setShipOnBoard.defineSpaceFieldName(fieldNameList, columnNameList, updatedColumnByShip);
            defineColorField.defineColorDropField(fieldNameList);
            props.setUpdatedColumn(fieldName[0], updatedColumnByShip);
        };
    };

    function swipeOverFields(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size);
        if (fieldNameList.indexOf(null) === -1) { 
            defineColorField.defineColorOverField(fieldNameList);
            props.updateColorShip(true);
        } else { 
            props.updateColorShip(false);
        };
    };

    function leaveFields(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size);
        fieldNameList.indexOf(null) === -1 && defineColorField.defineColorLeaveField(fieldNameList);
    };

    return (
        <div className="battlefield">
            <p className="table-name" id={!userTable ? "enemy-table": undefined}>{userTable ? "My table" : "Enemy table"}</p> 
            <div className="columns-name">
                {columnNameList.map(columName => {return <span key={columName} className="column-name">{columName}</span>})}
            </div>
            <div className="fields-name">
                {fieldNumberList.map(number => {return <span key={number} className="field-name">{number}</span>})}
            </div>
            <div className="game-fields">
                {columnNameList.map((columName) => {
                    return <Column 
                        key={columName} 
                        column={props.board[columName]} 
                        makeShoot={props.makeShoot} 
                        ship={props.ship}
                        dropShipOnBoard={dropShipOnBoard}
                        swipeOverFields={swipeOverFields}
                        leaveFields={leaveFields}
                    />
                })}
            </div>
        </div>
    );
};

export {Board};