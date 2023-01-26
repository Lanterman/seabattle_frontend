import { MakeShootOnBoard } from "../../../modules/makeShootOnBoard";

import "./Column.css";


function Column(props) {
    const column = JSON.parse(props.column.replace(/'/g, '"'))
    const isShoot = props.makeShoot && true;
    const isShipExists = props.ship && true;
    const makeShootOnBoard = new MakeShootOnBoard();

    function makeShoot(e) {
        const fieldName = e.target.attributes.name.value;
        if (["miss", "hit"].indexOf(column[fieldName]) === -1) {
            const updatedColumn = makeShootOnBoard.makeShoot(fieldName, column);
            props.makeShoot(fieldName[0], updatedColumn);
        };
    };

    function dropHandler(e, fieldName) {
        e.preventDefault();
        props.dropShipOnBoard(fieldName ,column);
    };

    function dragOverHandler(e, fieldName) {
        e.preventDefault();
        props.swipeOverFields(fieldName);
    };

    function dragLeaveHandler(e, fieldName) {
        props.leaveFields(fieldName);
    };

    return (
            <div className="column">
            {Object.keys(column).map((fieldName) => 
                <div 
                    key={fieldName} 
                    name={fieldName} 
                    id={isShoot ? "field" : undefined} 
                    className={`field ${column[fieldName] === "miss" ? "miss-shoot-field" :
                                        column[fieldName] === "hit" ? "hit-shoot-field" :
                                        column[fieldName] === "space" ? "space-field" :
                                        column[fieldName] && !isShoot ? "ship-field" :
                                        "empty-field"}`}  
                    onClick={isShoot ? makeShoot : undefined} 
                    onDrop={(e) => {isShipExists && dropHandler(e, fieldName)}}
                    onDragOver={(e) => {isShipExists && dragOverHandler(e, fieldName)}}
                    onDragLeave={(e) => {isShipExists && dragLeaveHandler(e, fieldName)}}>
                    {column[fieldName]}
                </div>
            )}
        </div>
    );
};


export {Column};