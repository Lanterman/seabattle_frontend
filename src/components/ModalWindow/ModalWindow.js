import "./ModalWindow.css";


function ModalWindow(props) {

    return (
        <div class="wrap">
            <div class="modal">
                <input type="button" onClick={() => {props.setIsOpenModal(false)}} value="close"/>
                Modal
            </div>
        </div>
    );
};

export { ModalWindow };