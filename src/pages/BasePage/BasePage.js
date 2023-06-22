import { Navigate } from "react-router-dom";

import "./BasePage.css";


function BasePage(props) {
    const token = sessionStorage.getItem("auth_token");

    return token ? (
        <div className="main-page">
            <div className="base-page">
                <h1 className="base-title">Sea battle</h1>
                <p className="description">
                    <p className="base">
                        One game can be played by 2 users or a user and a computer. 
                        The computer will have several levels of difficulty.
                    </p>
                    <p className="game-rules">
                        The rules of the game are as follows: in a 10x10 field, the players or the player 
                        and the computer place their ships (ships must not lie on top of each other, stand 
                        side by side, intersect) on their playing fields. The number of ships is 10, namely: 
                        one four-deck (one deck corresponds to one cell playing field), two three-deck, three 
                        two-deck and four single-deck. After arrangement ships, the players or the player and 
                        the computer alternately "shoot" at the cells of the opponent's playing field. If any 
                        of them managed to get into an enemy ship, then, according to the rules, the turn does 
                        not pass to the enemy (if the player hit the enemy ship, then he has the right to take 
                        one more shot) to next miss. Victory goes to the one who first destroys all enemy ships, 
                        with the loss connection will not have time to switch, will not make a move in the 
                        allotted time, or will want to give up. Each move is given a certain amount of time.
                    </p>
                </p>
            </div>
        </div>
    ) :
        <Navigate to={`/sign-in?next=/`}/>;
};

export {BasePage};