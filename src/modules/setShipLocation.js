class SetShipOnBoard {

    defineShipFieldsName(fieldName, shipSize) {
        const numberList = [...Array(shipSize).keys()];
        const fieldNameList = numberList.map(number => (
            (number % 2 === 0) ? fieldName[0] + (Number(fieldName.slice(1)) + (number === 0 ? number : number - 1)) : 
                fieldName[0] + (Number(fieldName.slice(1)) - (number === 1 ? number : number - 1))
        ));
        
        return fieldNameList.map(fieldName => Number(fieldName.slice(1)) <= 10 & Number(fieldName.slice(1)) > 0 ? fieldName : null);
    };

    defineSpaceFieldName(fieldNameList, columnNameList, column) {
        fieldNameList.sort();
        const lastElem = fieldNameList.length - 1;
        fieldNameList[0].slice(1) > 1 && (column[fieldNameList[0][0] + (fieldNameList[0].slice(1) - 1)] = "space");
        // fieldNameList[lastElem].slice(1) < 10 && (
        //     column[fieldNameList[lastElem][0] + (Number(fieldNameList[lastElem].slice(1)) + 1)] = "space"
        //     );
        console.log(fieldNameList, columnNameList)
        console.log(column);
        console.log("ДОДЕЛАТЬ ПРОСТРАНСТВО МЕЖДУ КОРАБЛЯМИ, УБРАТЬ ЦВЕТ ПРОСТРАНСТВА")
        console.log("ИСПРАВИТЬ ОШИБКУ ПРОСТРАНСТВА СВЕРХУ ЭТОГО ЖЕ СТОБЦА ПРИ ВСТАВКИ В 10 ЯЧЕЙКУ")
    };

    putShipOnBoard(fieldNameList, shipName, column) {
        fieldNameList.map(fieldName => column[fieldName] = shipName)
        return column
    };
};

export { SetShipOnBoard };
