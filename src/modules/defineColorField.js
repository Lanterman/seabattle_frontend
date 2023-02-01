class DefineColorField {

    defineColorField(fieldNameList, color) {
        fieldNameList.map((fieldName => (
            document.getElementsByName(fieldName)[0].style.background = color
        )));
    };

};

export { DefineColorField };
