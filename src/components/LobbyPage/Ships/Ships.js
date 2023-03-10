import "./Ships.css";


function Ships(props) {

    function replacePlaneOfShip(currentShip, ship) {
        if (ship.plane === "vertical" & (ship.name !== currentShip.name)) {
            ship.plane = "horizontal";
            document.getElementById(`${ship.name}-vertical`).attributes.class.value = "ship";
        };
    };

    function updateSpaceColor(spaceField, color, opacity=null) {
        spaceField.style.background = color;
        opacity ? spaceField.style.opacity = 0.7 : spaceField.style.opacity = 1;
    };

    function dragStartHandler(e, ship) {
        e.target.style.background = "#b7b9c7";
        Array.from(document.getElementsByClassName("space-field")).map(spaceField => updateSpaceColor(spaceField, "#e42c2c", true));
        props.setCurrentShip(Object.assign({}, ship, {shipHtml: e.target}));
    };

    function dragEndHandler(e, ship) {
        Array.from(document.getElementsByClassName("space-field")).map(spaceField => updateSpaceColor(spaceField, "#e2e7e7"));
        if (ship.count > 0) {
            if (props.client.isPut) ship.count -= 1;
            props.setShips([...props.ships], ship);
            props.client.isPut = false;
            if (ship.count > 0) {
                e.target.style.background = "#4382f7";
            } else {
                ship.plane = "horizontal";
            };
        };
    };

    function contextMenuHandler(e, currentShip) {
        e.preventDefault();
        if (currentShip.plane === "horizontal") {
            currentShip.plane = "vertical";
            props.ships.map(ship =>replacePlaneOfShip(currentShip, ship));
        } else {
            currentShip.plane = "horizontal";
        };
        
        props.ships.slice(props.ships[currentShip.size - 1], 1, currentShip);
        props.setShips(props.ships);
        props.setCurrentShip(Object.assign({}, currentShip, {shipHtml: e.target}));
    };

    return (
        <div className="initial-ships">
            {props.ships.map((ship) => 
                <div key={ship.name} className="shipBlock">
                    <label className="ship-label"> - {ship.count} {ship.count > 1 ? "ships" : "ship"}</label>
                    <p 
                        id={ship.plane === "vertical" ? `${ship.name}-vertical` : ship.name}
                        className={`ship ${ship.count ? "exists" : "does-not-exists"}`}
                        draggable={ship.count > 0 ? true : false}
                        onDragStart={(e) => dragStartHandler(e, ship)}
                        onDragEnd={(e) => dragEndHandler(e, ship)}
                        onContextMenu={(e) => ship.count > 0 ? contextMenuHandler(e, ship) : e.preventDefault()}>
                    </p>
                </div>
            )}
        </div>
    );
};


export { Ships };
