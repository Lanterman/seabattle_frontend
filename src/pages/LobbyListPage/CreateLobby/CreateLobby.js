import { useState } from "react";

import { CreateLobbyWindow } from "../../../components/ModalWindows/CreateLobbyWindow/CreateLobbyWindow";


import "./CreateLobby.css";

function CreateLobby(props) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    function onClickHandler() {
        setIsOpenModal(true);
    };

    return (
        <div>
            <input className="create-button" type="button" value="Create lobby" onClick={() => onClickHandler()}/>

            {isOpenModal && <CreateLobbyWindow 
                type="give-up" 
                msg="Do you really want to give up?"/>}
        </div>
    );
};

export default CreateLobby;