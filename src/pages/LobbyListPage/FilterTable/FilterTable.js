import { useState } from "react";

import { CreateLobbyWindow } from "../../../components/ModalWindows/CreateLobbyWindow/CreateLobbyWindow";


import "./FilterTable.css";

function FilterTable(props) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    function onClickHandler() {
        setIsOpenModal(true);
    };

    return (
        <div className="filter">
            <input className="filter-button" type="button" value="Filter" onClick={() => onClickHandler()}/>

            {isOpenModal && <CreateLobbyWindow
                isProcessing={props.isProcessing}
                setIsOpenModal={setIsOpenModal}
                />}
        </div>
    );
};

export default FilterTable;