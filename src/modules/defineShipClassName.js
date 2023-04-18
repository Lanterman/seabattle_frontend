class DefineShipClassName {

    defineShipClassName(fieldNameList, name) {
        fieldNameList.map((fieldName => (
            document.getElementsByName(fieldName)[0].attributes.class.value = `field ${name}`
        )));
    };

};

export { DefineShipClassName };
