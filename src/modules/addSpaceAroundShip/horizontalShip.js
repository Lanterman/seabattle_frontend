import { BasicClass } from "./basic"


class AddSpaceAroundShipHorizontally extends BasicClass {

    addSpaceAtTopHorizontally(fieldNameList, columnNameList, board) {
        const topColumnNumber = fieldNameList[0].slice(1) - 1;
        if (topColumnNumber >= 1) {
            fieldNameList.map(fieldName => (
                board[columnNameList.indexOf(fieldName[0])][fieldName[0] + topColumnNumber] = "space"
            ));
        };
    };

    addSpaceToRightHorizontally(fieldNameList, columnNameList, board) {
        const rightColumnIndex = columnNameList.indexOf(fieldNameList[fieldNameList.length - 1][0]) + 1;
        if (rightColumnIndex <= 9) {
            this.getLastElem(columnNameList[rightColumnIndex] + (fieldNameList[0].slice(1) - 1), columnNameList, board);
            this.getFirstElem(columnNameList[rightColumnIndex] + (fieldNameList[0].slice(1)), columnNameList, board);
            this.getLastElem(columnNameList[rightColumnIndex] + (fieldNameList[0].slice(1)), columnNameList, board);
        };
    };

    addSpaceAtBottomHorizontally(fieldNameList, columnNameList, board) {
        const topColumnNumber = Number(fieldNameList[0].slice(1)) + 1;
        if (topColumnNumber <= 10) {
            fieldNameList.map(fieldName => (
                board[columnNameList.indexOf(fieldName[0])][fieldName[0] + topColumnNumber] = "space"
            ));
        };
    };

    addSpaceToLeftHorizontally(firstElem, columnNameList, board) {
        const leftColumnIndex = columnNameList.indexOf(firstElem[0]) - 1;
        if (leftColumnIndex >= 0) {
            this.getLastElem(columnNameList[leftColumnIndex] + (firstElem.slice(1) - 1), columnNameList, board);
            this.getFirstElem(columnNameList[leftColumnIndex] + (firstElem.slice(1)), columnNameList, board);
            this.getLastElem(columnNameList[leftColumnIndex] + (firstElem.slice(1)), columnNameList, board);
        };
    };

    defineSpaceFieldName(fieldNameList, columnNameList, board) {
        fieldNameList.sort();
        this.addSpaceAtTopHorizontally(fieldNameList, columnNameList, board);
        this.addSpaceToRightHorizontally(fieldNameList, columnNameList, board);
        this.addSpaceAtBottomHorizontally(fieldNameList, columnNameList, board);
        this.addSpaceToLeftHorizontally(fieldNameList[0], columnNameList, board);
    };
};


export { AddSpaceAroundShipHorizontally };