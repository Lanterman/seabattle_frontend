class PrepareSettingShipOnBoard {

    isCanPut(fieldNameList, board) {
        if (fieldNameList.indexOf(null) === -1) {
            const check = fieldNameList.map(fieldName => (!board[fieldName[0]][fieldName] ?  true : false));
            return check.indexOf(false) >= 0 ? false : true;
        };
        return false;
    };

    defineShipFieldsName(fieldName, shipSize, shipPlane, columnNameList) {
        const numberList = [...Array(shipSize).keys()];
        if (shipPlane === "vertical") {
            const fieldNameList = numberList.map(number => (
                (number % 2 === 0) ? fieldName[0] + (Number(fieldName.slice(1)) + (number === 0 ? number : number - 1)) : 
                fieldName[0] + (Number(fieldName.slice(1)) - (number === 1 ? number : number - 1))
            ));
            
            return fieldNameList.map(fieldName => (
                Number(fieldName.slice(1)) <= 10 & Number(fieldName.slice(1)) > 0 ? fieldName : null
            ));
        } else {
            const indexOfField = columnNameList.indexOf(fieldName[0]);
            const indexList = numberList.map(number => (
                (number % 2 === 0) ? indexOfField - (number === 0 ? number : number - 1) : 
                    indexOfField + (number === 1 ? number : number - 1)
            ));

            return indexList.map(index => index < 10 & index >= 0 ? columnNameList[index] + fieldName.slice(1) : null)
        };
    };
};

export { PrepareSettingShipOnBoard };
