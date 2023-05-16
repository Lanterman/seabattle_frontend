import { useState } from "react";

import { FilterWindow } from "../../../components/ModalWindows/FilterWindow/FilterWindow";

import "./Filter.css";

function Filter(props) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    props.isProcessing && isOpenModal && setIsOpenModal(false);

    function onClickHandler() {
        setIsOpenModal(true);
    };

    return (
        <div className="filter">
            <input className="filter-button" type="button" value="Filter" onClick={() => onClickHandler()}/>

            {isOpenModal && <FilterWindow
                isProcessing={props.isProcessing}
                setIsOpenModal={setIsOpenModal}
                />}
        </div>
    );
};

export default Filter;