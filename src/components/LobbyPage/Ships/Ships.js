import { useState } from "react";

import "./Ships.css"


function Ships(props) {

    const [ships, setShips] = useState([
        {count: 4, size: 1, name: "singledeck"},
        {count: 3, size: 2, name: "doubledeck"},
        {count: 2, size: 3, name: "tripledeck"},
        {count: 1, size: 4, name: "fourdeck"},   
    ]);

    function dragStartHandler(e, ship) {
        e.target.style.background = "#b7b9c7";
        props.setShip(Object.assign({}, ship, {shipHtml: e.target}));
    };

    function dragEndHandler(e, ship) {
        console.log(props.ship)
        if (ship.count > 0) {
            if (!props.ship) ship.count -= 1;
            setShips([...ships], ship);
            if (ship.count > 0) e.target.style.background = "#4382f7";
        };
    };

    return (
        <div className="initial-ships">
            {ships.map((ship) => 
                <div key={ship.name} className="shipBlock">
                    <label className="ship-label"> - {ship.count} {ship.count > 1 ? "ships" : "ship"}</label>
                    <p id={ship.name} className="ship" draggable={ship.count > 0 ? true : false}
                        onDragStart={(e) => dragStartHandler(e, ship)}
                        onDragEnd={(e) => dragEndHandler(e, ship)}>
                    </p>
                </div>
            )}
        </div>
    );
};


export { Ships };
