import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faCheck } from '@fortawesome/free-solid-svg-icons';

import { PrepareSettingShipOnBoard } from "../../../modules/prepareSettingShip";
import { sendPutShip, sendRefreshBoard } from "../../../modules/wsRequests/wsLobbyRequests";
import { Column } from "../Column/Column";

import "./Board.css";


function Board(props) {
    const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const userId = props.userId;
    const isReady = useSelector(state => state.base.isReady);
    const board = columnNameList.map(columnName => JSON.parse(props.board[columnName].replace(/'/g, '"')));
    const prepareSetting = new PrepareSettingShipOnBoard();
    const defineColorField = props.defineColorField;

    function refreshTableHandler(e) {
        sendRefreshBoard(props.client, props.board.id, props.board.ships, board);
    };

    function dropShipOnBoard(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, props.ship.size, 
                                                                  props.ship.plane, columnNameList);
        if (prepareSetting.isCanPut(fieldNameList, columnNameList, board)) {
            defineColorField.defineColorField(fieldNameList, "#4382f7");
            sendPutShip(props.client, props.ship.id, props.board.id, props.ship.plane, 
                        props.ship.count, fieldNameList, board);
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
                { userId && !isReady && <FontAwesomeIcon className="refresh-table" icon={faRefresh} 
                                                         onClick={(e) => refreshTableHandler(e)}/>}
                {userId ? "My table" : "Enemy table"} 
                {userId && isReady && <FontAwesomeIcon className="check-mark" icon={faCheck}/>}
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