import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

import { PrepareSettingShipOnBoard } from "../../../modules/prepareSettingShip";
import { DefineShipClassName } from "../../../modules/defineShipClassName";
import { columnNameList, fieldNumberList, createBoardVariable } from "../../../modules/services";
import { setCurrentShip } from "../../../store/reducers/lobbyReducer";
import { sendPutShip, sendRefreshBoard } from "../../../modules/wsCommunication/wsLobby/wsLobbyRequests";
import { Column } from "../Column/Column";

import "./Board.css";


function Board(props) {
    const dispatch = useDispatch();
    const ship = useSelector(state => state.lobby.currentShip);
    const board = createBoardVariable(props.board);
    const boardOwner = props.board.user_id;
    const userId = Number(sessionStorage.getItem("user_id"));
    const isMyBoard = userId === boardOwner;
    const defineClassName = new DefineShipClassName();
    const prepareSetting = new PrepareSettingShipOnBoard();

    function refreshTableHandler(e) {
        sendRefreshBoard(props.client, props.board.id, props.board.ships, board);
        const refreshIcon = document.getElementById("refresh-table");
        refreshIcon.attributes.id.value = "wait";
        e.target.disabled = true;
        setTimeout(() => {
            e.target.disabled = false;
            refreshIcon.attributes.id.value = "refresh-table";
        }, 2500);
    };

    function dropShipOnBoard(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, ship.size, 
                                                                  ship.plane, columnNameList);
        if (prepareSetting.isCanPut(fieldNameList, board)) {
            dispatch(setCurrentShip(Object.assign({}, ship, {count: ship.count - 1})));
            sendPutShip(props.client, ship.id, props.board.id, ship.plane, 
                        ship.count, fieldNameList, board);
        };
    };

    function swipeOverFields(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, ship.size, 
                                                                  ship.plane, columnNameList);
        
        if (prepareSetting.isCanPut(fieldNameList, board)) {
            defineClassName.defineShipClassName(fieldNameList, "over");
            props.updateShipClassName(true);
            return;
        };
        props.updateShipClassName(false);
    };

    function leaveFields(fieldName) {
        const fieldNameList = prepareSetting.defineShipFieldsName(fieldName, ship.size, 
                                                                  ship.plane, columnNameList);
        if (prepareSetting.isCanPut(fieldNameList, board)) {
            defineClassName.defineShipClassName(fieldNameList, "");
        };
    };

    return (
        <div className="battlefield">
            <p className="table-name" id={!isMyBoard ? "enemy-table": undefined}>
                <i className="name">{isMyBoard ? "My table" : "Enemy table"}</i>
                {isMyBoard && !props.board.is_ready && 
                    <span title="Clear game board" className="refresh">
                        <FontAwesomeIcon id="refresh-table" icon={faRefresh}/>
                        <input type="button" className="refresh-button" onClick={refreshTableHandler}/>
                    </span>}
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
            <div className="game-fields" id={props.board.is_my_turn ? "my-turn" : "enemy-turn"}>
                {columnNameList.map((columName) => {
                    return <Column 
                        key={columName}
                        lobbyId={props.lobbyId}
                        lobbySlug={props.lobbySlug}
                        boardId={props.board.id}
                        isMyBoard={isMyBoard}
                        column={board[columName]}
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