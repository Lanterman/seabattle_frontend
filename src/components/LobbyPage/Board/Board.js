import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

import { SetShipOnBoard } from "../../../modules/setShipLocation";
import { DefineColorField } from "../../../modules/defineColorField";

import { Column } from "../Column/Column";

import "./Board.css";


function Board(props) {
    const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const userTable = props.board.user_id;
    const board = columnNameList.map(columnName => JSON.parse(props.board[columnName].replace(/'/g, '"')));
    const setShipOnBoard = new SetShipOnBoard();
    const defineColorField = new DefineColorField();
    // console.log("поработать над закрытием вебсокета переходе на другую страницу, на уровне соединения с вебсокетом в python")


    function updateBoardState(board) {
        columnNameList.map(columnName => {
            return props.board[columnName] = JSON.stringify(board[columnNameList.indexOf(columnName)])
        });

        props.setUpdatedBoard(props.board);
    };

    function refreshTableHandler(e) {
        props.client.refreshBoard(props.board.id, userTable, props.board.ships, board);
        props.client.client.onmessage = function(e) {
            const data = JSON.parse(e.data);
            updateBoardState(data.cleared_board);
            defineColorField.defineColorField(data.field_name_list, "#e2e7e7");
            props.returnShips(data.ships);
        };
    };

    function dropShipOnBoard(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size, props.ship.plane, columnNameList);
        if (setShipOnBoard.isCanPut(fieldNameList, columnNameList, board)) {
            props.client.isPut = true;
            props.client.putShipOnBoard(userTable, props.ship.id, props.board.id, props.ship.plane, props.ship.count, fieldNameList, board);
            props.client.client.onmessage = function(e) {
                const data = JSON.parse(e.data);
                updateBoardState(data.board);
                defineColorField.defineColorField(fieldNameList, "#4382f7");
            };
        };
    };

    function swipeOverFields(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size, props.ship.plane, columnNameList);
        
        if (setShipOnBoard.isCanPut(fieldNameList, columnNameList, board)) {
            defineColorField.defineColorField(fieldNameList, "gray");
            props.updateColorShip(true);
            return;
        };
        props.updateColorShip(false);
    };

    function leaveFields(fieldName) {
        const fieldNameList = setShipOnBoard.defineShipFieldsName(fieldName, props.ship.size, props.ship.plane, columnNameList);
        setShipOnBoard.isCanPut(fieldNameList, columnNameList, board) && defineColorField.defineColorField(fieldNameList, "#e2e7e7");
    };

    return (
        <div className="battlefield">
            <p className="table-name" id={!userTable ? "enemy-table": undefined}>
            { userTable && <FontAwesomeIcon className="refresh-table" icon={faRefresh} onClick={(e) => refreshTableHandler(e)}/>}
            {userTable ? "My table" : "Enemy table"}
            </p> 
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