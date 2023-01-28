class SetShipOnBoard {

    isCanPut(fieldNameList, columnNameList, board) {
        if (fieldNameList.indexOf(null) === -1) {
            const check = fieldNameList.map(fieldName => (
                !board[columnNameList.indexOf(fieldName[0])][fieldName] ?  true : false
            ));
            return check.indexOf(false) >= 0 ? false : true;
        };
        return false;
    };

    defineShipFieldsName(fieldName, shipSize) {
        const numberList = [...Array(shipSize).keys()];
        const fieldNameList = numberList.map(number => (
            (number % 2 === 0) ? fieldName[0] + (Number(fieldName.slice(1)) + (number === 0 ? number : number - 1)) : 
                fieldName[0] + (Number(fieldName.slice(1)) - (number === 1 ? number : number - 1))
        ));
        
        return fieldNameList.map(fieldName => Number(fieldName.slice(1)) <= 10 & Number(fieldName.slice(1)) > 0 ? fieldName : null);
    };

    putShipOnBoard(fieldNameList, shipName, columnNameList, board) {
        fieldNameList.map(fieldName => {
            return board[columnNameList.indexOf(fieldName[0])][fieldName] = shipName
        });

        return board;
    };
};

export { SetShipOnBoard };
