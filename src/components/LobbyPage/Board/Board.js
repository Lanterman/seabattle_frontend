import { Column } from "../Column/Column";

import "./Board.css"


function Board(props) {
    const columnNameList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const fieldNumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const userTable = props.board.user_id

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
                    column={props.board[columName]} 
                    key={columName} 
                    makeShoot={props.makeShoot} 
                    ship={props.ship}
                    updateColorShip={props.updateColorShip}
                    setUpdatedColumn={props.setUpdatedColumn}
                    />
                })}
            </div>
        </div>
    );
};

export {Board};