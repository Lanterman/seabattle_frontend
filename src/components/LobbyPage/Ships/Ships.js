import { useSelector, useDispatch } from "react-redux";

import { setCurrentShip } from "../../../store/reducers/lobbyReducer";

import "./Ships.css";


function Ships(props) {
    const dispatch = useDispatch();
    const ships = useSelector(state => state.lobby.myBoard).ships;
    const currentShip = useSelector(state => state.lobby.currentShip);

    function replacePlaneOfShip(currentShip, ship) {
        if (ship.plane === "vertical" & (ship.name !== currentShip.name)) {
            ship.plane = "horizontal";
            document.getElementById(`${ship.name}-vertical`).attributes.class.value = "ship";
        };
    };

    function updateSpaceClassName(spaceField, name, opacity=null) {
        spaceField.attributes.class.value = `field ${name}`;
        opacity ? spaceField.style.opacity = 0.7 : spaceField.style.opacity = 1;
    };

    function dragStartHandler(e, ship) {
        e.target.attributes.class.value = "ship action";
        Array.from(document.getElementsByClassName("space-field")).map(spaceField => updateSpaceClassName(spaceField, "space-action", true));
        dispatch(setCurrentShip(Object.assign({}, ship)));
    };

    function dragEndHandler(e) {
        Array.from(document.getElementsByClassName("space-action")).map(spaceField => updateSpaceClassName(spaceField, "space-field"));
        if (currentShip.count > 0) {
            e.target.attributes.class.value = "ship exists";
        };
        dispatch(setCurrentShip(null));
    };

    function contextMenuHandler(e, currentShip) {
        e.preventDefault();
        e.target.attributes.class.value = "ship exists";
        if (currentShip.plane === "horizontal") {
            currentShip.plane = "vertical";
            ships.map(ship =>replacePlaneOfShip(currentShip, ship));
        } else {
            currentShip.plane = "horizontal";
        };
        
        ships.slice(ships[currentShip.size - 1], 1, currentShip);
        dispatch(setCurrentShip(Object.assign({}, currentShip)));
    };

    return (
        <div className="initial-ships">
            {ships.map((ship) =>
                <div key={ship.name} className="shipBlock">
                    <label className="ship-label"> - {ship.count} {ship.count > 1 ? "ships" : "ship"}</label>
                    <p 
                        id={ship.plane === "vertical" ? `${ship.name}-vertical` : ship.name}
                        className={`ship ${ship.count > 0 ? "exists" : "does-not-exists"}`}
                        draggable={ship.count > 0 ? true : false}
                        onDragStart={(e) => ship.count > 0 && dragStartHandler(e, ship)}
                        onDragEnd={(e) => ship.count > 0 && dragEndHandler(e)}
                        onContextMenu={(e) => ship.count > 0 ? contextMenuHandler(e, ship) : e.preventDefault()}>
                    </p>
                </div>
            )}
        </div>
    );
};


export { Ships };
