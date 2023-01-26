class SetShipOnBoard {

    defineShipFieldsName(fieldName, shipSize) {
        const numberList = [...Array(shipSize).keys()];
        const fieldNameList = numberList.map(number => (
            (number % 2 === 0) ? fieldName[0] + (Number(fieldName.slice(1)) + (number === 0 ? number : number - 1)) : 
                fieldName[0] + (Number(fieldName.slice(1)) - (number === 1 ? number : number - 1))
        ));
        
        return fieldNameList.map(fieldName => Number(fieldName.slice(1)) <= 10 & Number(fieldName.slice(1)) > 0 ? fieldName : null);
    };

    defineSpaceFieldName(column) {
        console.log(column);
    };

    putShipOnBoard(fieldNameList, shipName, column) {
        fieldNameList.map(fieldName => column[fieldName] = shipName)
        return column
    };
};

export { SetShipOnBoard };
