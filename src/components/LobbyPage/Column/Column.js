import "./Column.css";


function Column(props) {
    const isEnemyBoard = !props.userId && true;
    const isShipExists = props.ship && true;

    function sendToWS(boardId, fieldName) {
        props.client.send(JSON.stringify({
            type: "make_shot",
            board_id: boardId,
            field_name: fieldName,
        }));
    };

    function makeShot(e) {
        const fieldName = e.target.attributes.name.value;
        if (["miss", "hit"].indexOf(props.column[fieldName]) === -1) {
            sendToWS(props.boardId, fieldName);
        };
    };

    function dropHandler(e, fieldName) {
        e.preventDefault();
        props.dropShipOnBoard(fieldName);
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
            {Object.keys(props.column).map((fieldName) => 
                <div 
                    key={fieldName} 
                    name={fieldName} 
                    id={isEnemyBoard ? "field" : undefined} 
                    className={`field ${props.column[fieldName] === "miss" ? "miss-shoot-field" :
                        props.column[fieldName] === "hit" ? "hit-shoot-field" :
                        String(props.column[fieldName]).includes("space") ? "space-field" :
                        props.column[fieldName] && !isEnemyBoard ? "ship-field" :
                        "empty-field"}`}  
                    onClick={isEnemyBoard ? makeShot : undefined} 
                    onDrop={(e) => {isShipExists && dropHandler(e, fieldName)}}
                    onDragOver={(e) => {isShipExists && dragOverHandler(e, fieldName)}}
                    onDragLeave={(e) => {isShipExists && dragLeaveHandler(e, fieldName)}}>
                </div>
            )}
        </div>
    );
};


export {Column};