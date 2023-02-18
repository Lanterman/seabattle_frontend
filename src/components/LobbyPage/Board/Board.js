import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

import { PrepareSettingShipOnBoard } from "../../../modules/prepareSettingShip";
import { DefineColorField } from "../../../modules/defineColorField";

import { Column } from "../Column/Column";

import "./Board.css";


function Board(props) {
    const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const userId = props.userId;
    const board = columnNameList.map(columnName => JSON.parse(props.board[columnName].replace(/'/g, '"')));
    const prepareSetting = new PrepareSettingShipOnBoard();
    const defineColorField = new DefineColorField();
    // console.log("поработать над закрытием вебсокета переходе на другую страницу, на уровне соединения с вебсокетом в python")

    function refreshBoard(boardId, ships, board) {
        props.client.send(JSON.stringify({
            type: "refresh_board",
            board_id: boardId,
            ships: ships,
            board: board,
        }));
    };

    function updateBoardState(board) {
        columnNameList.map(columnName => {
            return props.board[columnName] = JSON.stringify(board[columnNameList.indexOf(columnName)])
        });

        props.setUpdatedBoard(props.board);
    };

    function refreshTableHandler(e) {
        refreshBoard(props.board.id, props.board.ships, board);
        props.client.onmessage = function(e) {
            const data = JSON.parse(e.data);
            updateBoardState(data.cleared_board);
            defineColorField.defineColorField(data.field_name_list, "#e2e7e7");
            props.returnShips(data.ships);
        };
    };

    function dropShipOnBoard(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, props.ship.size, 
                                                                  props.ship.plane, columnNameList);
        if (prepareSetting.isCanPut(fieldNameList, columnNameList, board)) {
            props.client.isPut = true;
            props.client.putShipOnBoard(props.ship.id, props.board.id, props.ship.plane, 
                                        props.ship.count, fieldNameList, board);
            props.client.client.onmessage = function(e) {
                const data = JSON.parse(e.data);
                updateBoardState(data.board);
                defineColorField.defineColorField(fieldNameList, "#4382f7");
            };
        };
    };

    function swipeOverFields(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, props.ship.size, 
                                                                  props.ship.plane, columnNameList);
        
        if (prepareSetting.isCanPut(fieldNameList, columnNameList, board)) {
            defineColorField.defineColorField(fieldNameList, "gray");
            props.updateColorShip(true);
            return;
        };
        props.updateColorShip(false);
    };

    function leaveFields(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, props.ship.size, 
                                                                  props.ship.plane, columnNameList);
        if (prepareSetting.isCanPut(fieldNameList, columnNameList, board)) {
            defineColorField.defineColorField(fieldNameList, "#e2e7e7");
        };
    };

    return (
        <div className="battlefield">
            <p className="table-name" id={!userId ? "enemy-table": undefined}>
                { userId && <FontAwesomeIcon className="refresh-table" icon={faRefresh} 
                                                onClick={(e) => refreshTableHandler(e)}/>}
                {userId ? "My table" : "Enemy table"} {props.board.id}
            </p> 
            <div className="columns-name">
                {columnNameList.map(columName => {
                    return <span key={columName} className="column-name">{columName}</span>})
                }
            </div>
            <div className="fields-name">
                {fieldNumberList.map(number => {return <span key={number} className="field-name">{number}</span>})}
            </div>
            <div className="game-fields">
                {board.map((colum) => {
                    return <Column 
                        key={board.indexOf(colum)} 
                        boardId={props.board.id}
                        userId={userId}
                        column={colum}
                        ship={props.ship}
                        client={props.client}
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