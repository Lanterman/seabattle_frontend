import { useState } from "react";

import "./Ships.css";


function Ships(props) {
    const [shipPlane, setShipPlane] = useState(null)

    function replacePlaneOfShip(currentShip, ship) {
        if (ship.plane === "vertical" & (ship.name !== currentShip.name)) {
            ship.plane = "horizontal";
            document.getElementById(ship.name).attributes.class.value = "ship";
        };
    };

    function dragStartHandler(e, ship) {
        e.target.style.background = "#b7b9c7";
        props.setCurrentShip(Object.assign({}, ship, {shipHtml: e.target}));
    };

    function dragEndHandler(e, ship) {
        if (ship.count > 0) {
            if (!props.currentShip) ship.count -= 1;
            props.setShips([...props.ships], ship);
            if (ship.count > 0) e.target.style.background = "#4382f7";
        };
    };

    function contextMenuHandler(e, currentShip) {
        e.preventDefault();
        if (currentShip.plane === "horizontal") {
            currentShip.plane = "vertical";
            setShipPlane(currentShip.name)
            props.ships.map(ship =>replacePlaneOfShip(currentShip, ship));
        } else {
            currentShip.plane = "horizontal";
            setShipPlane();
        };
        
        props.ships.slice(props.ships[currentShip.size - 1], 1, currentShip);
        props.setShips(props.ships);
    };

    return (
        <div className="initial-ships">
            {props.ships.map((ship) => 
                <div key={ship.name} className="shipBlock">
                    <label className="ship-label"> - {ship.count} {ship.count > 1 ? "ships" : "ship"}</label>
                    <p 
                        id={shipPlane === ship.name ? `${ship.name}-vertical` : ship.name}
                        className="ship"
                        draggable={ship.count > 0 ? true : false}
                        onDragStart={(e) => dragStartHandler(e, ship)}
                        onDragEnd={(e) => dragEndHandler(e, ship)}
                        onContextMenu={(e) => contextMenuHandler(e, ship)}>
                    </p>
                </div>
            )}
        </div>
    );
};


export { Ships };
