import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";

import "./SidePanel.css";

function SidePanel(props) {
    const username = sessionStorage.getItem("username");
    const gamesHistory = useSelector(state => state.profile.gamesHistory);

    return (
        <div className="profile-side-panel">
                <div className="profile-side-title">
                    Games history
                </div>
                {gamesHistory.map((game, number) => {
                    return (
                        <Link to={`/lobbies/${game.slug}/`} key={number} 
                            className={`game-history ${number % 2 === 0 ? "odd" : "even"}`}
                        >
                            <span className="game-number">{number + 1}.</span>
                            <span className={`game-name ${game.winner === username ? "win": "lose"}`}>
                            {game.name.length <= 35 ? game.name : game.name.slice(0, 32) + "..."}
                            </span>

                            {game.password ? 
                                <FontAwesomeIcon icon={faLock} className="game-is-private"/> :
                                <FontAwesomeIcon icon={faUnlock} className="game-is-private"/>
                            }
                        </Link>
                    )
                })}
        </div>
    );
};

export { SidePanel };