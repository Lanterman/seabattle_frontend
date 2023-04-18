import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faMoneyBillTransfer,  faClock } from '@fortawesome/free-solid-svg-icons'

import "./Lobby.css"


function Lobby(props) {
    const lobby = props.lobby;

    return (
        <div className="lobby">
            <Link to={`${lobby.slug}`} className="lobbyLink">
                <p className="lobbyName">{lobby.name}</p>
                <div className="options">
                    {lobby.password && <FontAwesomeIcon icon={faLock} className="privateLobby"/>}

                    <span className="option">{lobby.bet}</span>
                    <FontAwesomeIcon icon={faMoneyBillTransfer}/>

                    <span className="option">{lobby.time_to_move}</span>
                    <FontAwesomeIcon icon={faClock}/>

                    <div className="ownerLobby">
                        <p>{lobby.users[0].username}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export { Lobby };
