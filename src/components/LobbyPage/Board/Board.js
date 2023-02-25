import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

import { PrepareSettingShipOnBoard } from "../../../modules/prepareSettingShip";
import { DefineShipClassName } from "../../../modules/defineShipClassName";
import { setCurrentShip } from "../../../store/reducers/lobbyReducer";
import { sendPutShip, sendRefreshBoard } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { Column } from "../Column/Column";

import "./Board.css";


function Board(props) {
    const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const isMyBoard = props.userId;
    const board = columnNameList.map(columnName => JSON.parse(props.board[columnName].replace(/'/g, '"')));
    const dispatch = useDispatch();
    const defineClassName = new DefineShipClassName();
    const prepareSetting = new PrepareSettingShipOnBoard();

    function refreshTableHandler(e) {
        sendRefreshBoard(props.client, props.board.id, props.board.ships, board);
    };

    function dropShipOnBoard(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, props.ship.size, 
                                                                  props.ship.plane, columnNameList);
        if (prepareSetting.isCanPut(fieldNameList, columnNameList, board)) {
            dispatch(setCurrentShip(Object.assign({}, props.ship, {count: props.ship.count - 1})));
            sendPutShip(props.client, props.ship.id, props.board.id, props.ship.plane, 
                        props.ship.count, fieldNameList, board);
        };
    };

    function swipeOverFields(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, props.ship.size, 
                                                                  props.ship.plane, columnNameList);
        
        if (prepareSetting.isCanPut(fieldNameList, columnNameList, board)) {
            defineClassName.defineShipClassName(fieldNameList, "over");
            props.updateShipClassName(true);
            return;
        };
        props.updateShipClassName(false);
    };

    function leaveFields(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, props.ship.size, 
                                                                  props.ship.plane, columnNameList);
        if (prepareSetting.isCanPut(fieldNameList, columnNameList, board)) {
            defineClassName.defineShipClassName(fieldNameList, "");
        };
    };

    return (
        <div className="battlefield">
            <p className="table-name" id={!isMyBoard ? "enemy-table": undefined}>
                <i className="name">{isMyBoard ? "My table" : "Enemy table"}</i>
                {isMyBoard && !props.board.is_ready && <FontAwesomeIcon className="refresh-table" icon={faRefresh} 
                                                                           onClick={refreshTableHandler}/>}
                {!isMyBoard && !props.board.is_ready && <FontAwesomeIcon className="nready" icon={faClock}/>}
                {props.board.is_ready && <FontAwesomeIcon className="ready" icon={faCheck}/>}
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
                        isEnemyBoard={isMyBoard}
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