import { SetShipOnBoard } from "../../../modules/setShipLocation";
import { DefineColorField } from "../../../modules/defineColorField";
import { AddSpaceAroundShipHorizontally } from "../../../modules/addSpaceAroundShip/horizontalShip";
import { AddSpaceAroundShipVertically } from "../../../modules/addSpaceAroundShip/verticalShip";

import { Column } from "../Column/Column";

import "./Board.css"


function Board(props) {
    const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const userTable = props.board.user_id;
    const board = columnNameList.map(columnName => JSON.parse(props.board[columnName].replace(/'/g, '"')));
    const setShipOnBoard = new SetShipOnBoard();
    const addSpaceAroundShipHorizontally = new AddSpaceAroundShipHorizontally();
    const addSpaceAroundShipVertically = new AddSpaceAroundShipVertically();
    const defineColorField = new DefineColorField();

    function dropShipOnBoard(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size, props.ship.plane, columnNameList);
        if (setShipOnBoard.isCanPut(fieldNameList, columnNameList, board)) {
            setShipOnBoard.putShipOnBoard(fieldNameList, props.ship.name, columnNameList, board);

            props.ship.plane === "horizontal" ? 
                addSpaceAroundShipHorizontally.defineSpaceFieldName(fieldNameList, columnNameList, board) :
                addSpaceAroundShipVertically.defineSpaceFieldName(fieldNameList, columnNameList, board);

            defineColorField.defineColorDropField(fieldNameList);

            columnNameList.map(columnName => {
                return props.board[columnName] = JSON.stringify(board[columnNameList.indexOf(columnName)])
            });

            props.setUpdatedBoard(props.board);
        };
    };

    function swipeOverFields(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size, props.ship.plane, columnNameList);
        
        if (setShipOnBoard.isCanPut(fieldNameList, columnNameList, board)) {
            defineColorField.defineColorOverField(fieldNameList);
            props.updateColorShip(true);
            return;
        };
        props.updateColorShip(false);
    };

    function leaveFields(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size, props.ship.plane, columnNameList);
        setShipOnBoard.isCanPut(fieldNameList, columnNameList, board) && defineColorField.defineColorLeaveField(fieldNameList);
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
                {board.map((colum) => {
                    return <Column 
                        key={board.indexOf(colum)} 
                        column={colum} 
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