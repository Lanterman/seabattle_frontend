class DefineColorField {

    defineColorOverField(fieldNameList, updateColorShip) {
        updateColorShip(true);
        fieldNameList.map((fieldName => (
            document.getElementsByName(fieldName)[0].style.background = "gray"
        )));
    };

    defineColorLeaveField(fieldNameList) {
        fieldNameList.map((fieldName => (
            document.getElementsByName(fieldName)[0].style.background = "#e2e7e7"
        )));
    };
};

export { DefineColorField };
