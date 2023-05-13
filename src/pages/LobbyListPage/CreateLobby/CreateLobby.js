import { useState } from "react";

import { CreateLobbyWindow } from "../../../components/ModalWindows/CreateLobbyWindow/CreateLobbyWindow";


import "./CreateLobby.css";

function CreateLobby(props) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    function onClickHandler() {
        setIsOpenModal(true);
    };

    return (
        <div className="create">
            <input className="create-button" type="button" value="Create lobby" onClick={() => onClickHandler()}/>

            {isOpenModal && <CreateLobbyWindow
                isProcessing={props.isProcessing}
                setIsOpenModal={setIsOpenModal}
                />}
        </div>
    );
};

export default CreateLobby;