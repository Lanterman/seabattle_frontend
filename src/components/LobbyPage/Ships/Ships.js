import { useState } from "react";

import "./Ships.css"


function Ships(props) {

    const [ships, setShips] = useState([
        {count: 4, size: 1, name: "singledeck", plane: "horizontal"},
        {count: 3, size: 2, name: "doubledeck", plane: "horizontal"},
        {count: 2, size: 3, name: "tripledeck", plane: "horizontal"},
        {count: 1, size: 4, name: "fourdeck", plane: "horizontal"},   
    ]);

    function replacePlaneOfShip(currentShip, ship) {
        if (ship.plane === "vertical" & (ship.name !== currentShip.name)) {
            ship.plane = "horizontal";
            document.getElementById(ship.name).attributes.class.value = "ship";
        };
    };

    function dragStartHandler(e, ship) {
        e.target.style.background = "#b7b9c7";
        props.setShip(Object.assign({}, ship, {shipHtml: e.target}));
    };

    function dragEndHandler(e, ship) {
        if (ship.count > 0) {
            if (!props.ship) ship.count -= 1;
            setShips([...ships], ship);
            if (ship.count > 0) e.target.style.background = "#4382f7";
        };
    };

    function contextMenuHandler(e, currentShip) {
        e.preventDefault();
        if (currentShip.plane === "horizontal") {
            currentShip.plane = "vertical";
            e.target.attributes.class.value += " transform";
            ships.map(ship =>replacePlaneOfShip(currentShip, ship));
        } else {
            currentShip.plane = "horizontal";
            e.target.attributes.class.value = "ship";
        };
        
        ships.slice(ships[currentShip.size - 1], 1, currentShip);
        setShips(ships);
    };

    return (
        <div className="initial-ships">
            {ships.map((ship) => 
                <div key={ship.name} className="shipBlock">
                    <label className="ship-label"> - {ship.count} {ship.count > 1 ? "ships" : "ship"}</label>
                    <p 
                        id={ship.name}
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
