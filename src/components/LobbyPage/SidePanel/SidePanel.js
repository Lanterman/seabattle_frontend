import { Chat } from "../Chat/Chat";

import "./SidePanel.css";

function SidePanel(props) {

    return (
        <div className="side-panel">
            <Chat />
            {props.isReady && <p className="label-ready">You ready!!!</p>}
            <input className="ready" type="button" value="Ready" onClick={(e) => {props.setIsReady(!props.isReady)}}/>
        </div>
    );
};

export { SidePanel };