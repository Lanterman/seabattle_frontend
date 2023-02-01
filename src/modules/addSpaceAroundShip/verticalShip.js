import { BaseClass } from "./basic"


class AddSpaceAroundShipVertically extends BaseClass {

    addSpaceAtTopVertically(firstElem, columnNameList, board) {
        this.getFirstElem(firstElem, columnNameList,board);
    };

    addSpaceToRightVertically(fieldNameList, columnNameList, board) {
        const rightColumnIndex = columnNameList.indexOf(fieldNameList[0][0]) + 1;
        if (rightColumnIndex < 10) {
            fieldNameList.map(fieldName =>(
                board[rightColumnIndex][columnNameList[rightColumnIndex] + fieldName.slice(1)] = "space"
            ));
            this.getFirstElem(columnNameList[rightColumnIndex] + (fieldNameList[0].slice(1)), columnNameList, board);
            this.getLastElem(columnNameList[rightColumnIndex] + (fieldNameList[fieldNameList.length - 1].slice(1)), columnNameList, board);   
        };
    };

    addSpaceAtBottomVertically(lastElem, columnNameList, board) {
        this.getLastElem(lastElem, columnNameList, board);
    };

    addSpaceToLeftVertically(fieldNameList, columnNameList, board) {
        const leftColumnIndex = columnNameList.indexOf(fieldNameList[0][0]) - 1;
        if (leftColumnIndex >= 0) {
            fieldNameList.map(fieldName => (
                board[leftColumnIndex][columnNameList[leftColumnIndex] + fieldName.slice(1)] = "space"
            ));
            this.getFirstElem(columnNameList[leftColumnIndex] + (fieldNameList[0].slice(1)), columnNameList, board);
            this.getLastElem(columnNameList[leftColumnIndex] + (fieldNameList[fieldNameList.length - 1].slice(1)), columnNameList, board);
        };
    };

    defineSpaceFieldName(fieldNameList, columnNameList, board) {
        fieldNameList.sort(this.compareNumber);
        this.addSpaceAtTopVertically(fieldNameList[0], columnNameList, board);
        this.addSpaceToRightVertically(fieldNameList, columnNameList, board);
        this.addSpaceAtBottomVertically(fieldNameList[fieldNameList.length - 1], columnNameList, board);
        this.addSpaceToLeftVertically(fieldNameList, columnNameList, board);
    };
};


export { AddSpaceAroundShipVertically };