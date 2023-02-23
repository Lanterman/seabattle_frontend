import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer,  faClock, faUser } from '@fortawesome/free-solid-svg-icons';

import { setEnemyBoard, setMyBoard, setShips, setIsCanPutShip, setCurrentShip } from "../../../store/reducers/lobbyReducer";
import { DefineColorField } from "../../../modules/defineColorField";
import { Board } from "../Board/Board";
import { Ships } from "../Ships/Ships";

import "./Lobby.css";


function Lobby(props) {
    const dispatch = useDispatch();
    const lobby = props.lobby;
    const userId = Number(sessionStorage.getItem("user_id"));
    const enemy = lobby.users[0]["id"] === userId ? lobby.users[1] : lobby.users[0];
    const myBoard = useSelector(state => state.lobby.myBoard);
    const enemyBoard = useSelector(state => state.lobby.enemyBoard);
    const currentShip = useSelector(state => state.lobby.currentShip);
    const isCanPutShip = useSelector(state => state.lobby.isCanPutShip);
    const defineColorField = new DefineColorField();
    // console.log("поработать над закрытием вебсокета переходе на другую страницу, на уровне соединения с вебсокетом в python")
    // console.log("выводится информация о поле противника в инструменте разработчика, пофиксить это")
    console.log("длделать состояние готовности, остановился на выводе")

    useEffect(() => {
        props.client.onopen = (e) => console.log("Websocket started");
        props.client.onmessage = (e) => {
            const data = JSON.parse(e.data);

            for (let key in data.board) {
                data.board[key] = JSON.stringify(data.board[key]);
            };

            if (data.type === "send_shot") {
                userId === data.user_id ?
                    dispatch(setEnemyBoard(Object.assign({}, enemyBoard, data.board))) :
                    dispatch(setMyBoard(Object.assign({}, myBoard, data.board)));

            } else if (data.type === "drop_ship") {
                dispatch(setMyBoard(Object.assign({}, myBoard, data.board)));
                dispatch(setCurrentShip(null));
                dispatch(setShips(data.ships));

            } else if (data.type === "clear_board") {
                defineColorField.defineColorField(data.field_name_list, "#e2e7e7");
                dispatch(setMyBoard(Object.assign({}, myBoard, data.board)));
                dispatch(setCurrentShip(null));
                dispatch(setShips(data.ships));
                Array.from(document.getElementsByClassName("ship")).map(element => element.style.background = "#4382f7");
            } else if (data.type === "is_ready_to_play") {
                userId === data.user_id ?
                    dispatch(setEnemyBoard(Object.assign({}, enemyBoard, data.board))) :
                    dispatch(setMyBoard(Object.assign({}, myBoard, data.board)));
            };
        };
    });

    function updateColorShip(value) {
        dispatch(setIsCanPutShip(value));
        const actionShip = document.getElementsByClassName("action")[0];

        if (isCanPutShip) {
            actionShip.attributes.style.value = "#b7b9c7";
        } else {
            actionShip.attributes.style.value = "red";
        };
    };

    return (
        <div className="singl-lobby">
            <h1 className="lobby-name">{lobby.name}</h1>
            <div className="lobby-options">
                <span className="bet">{lobby.bet}</span>
                <FontAwesomeIcon icon={faMoneyBillTransfer}/>

                <span className="time-to-move">{lobby.time_to_move}</span>
                <FontAwesomeIcon icon={faClock}/>

                <Link to="/" className="enemy">
                    <span>{enemy.username}</span>
                    <FontAwesomeIcon icon={faUser}/>
                </Link>
            </div>
            
            <div className="game-block">
                <Board
                    client={props.client}
                    board={myBoard}
                    userId={userId}
                    ship={currentShip}
                    updateColorShip={updateColorShip}
                    defineColorField={defineColorField}
                />
                <Board board={enemyBoard} client={props.client}/>
            </div>
            <Ships />
        </div>
    );
};


export { Lobby };
