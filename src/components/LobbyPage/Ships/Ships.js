import { useSelector, useDispatch } from "react-redux";

import { setCurrentShip } from "../../../store/reducers/lobbyReducer";

import "./Ships.css";


function Ships(props) {
    const dispatch = useDispatch();
    const ships = useSelector(state => state.lobby.ships);
    const currentShip = useSelector(state => state.lobby.currentShip);

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
        e.target.attributes.class.value = "ship action";
        Array.from(document.getElementsByClassName("space-field")).map(spaceField => updateSpaceColor(spaceField, "#e42c2c", true));
        dispatch(setCurrentShip(Object.assign({}, ship)));
    };

    function dragEndHandler(e) {
        Array.from(document.getElementsByClassName("space-field")).map(spaceField => updateSpaceColor(spaceField, "#e2e7e7"));
        if (currentShip.count > 0) {
            e.target.style.background = "#4382f7";
        };
        dispatch(setCurrentShip(null));
        e.target.attributes.class.value = "ship";
    };

    function contextMenuHandler(e, currentShip) {
        e.preventDefault();
        e.target.attributes.class.value = "ship exists action";
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
