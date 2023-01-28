class AddSpaceAroundShip {
    constructor(plane) {
        this.plane = plane;
    };

    compareNumber(a, b) {
        return a.slice(1) - b.slice(1);
    };

    getFirstElem(firstElem, columnNameList, board) {
        firstElem.slice(1) > 1 && (
            board[columnNameList.indexOf(firstElem[0])][firstElem[0] + (firstElem.slice(1) - 1)] = "space"
        );
    };

    getLastElem(lastElem, columnNameList, board) {
        lastElem.slice(1) < 10 && (
            board[columnNameList.indexOf(lastElem[0])][lastElem[0] + (Number(lastElem.slice(1)) + 1)] = "space"
        );
    };

    addSpaceAtTop(fieldNameList, columnNameList, board) {
        if (this.plane === "vertical") {
            this.getFirstElem(fieldNameList[0], columnNameList,board);
        } else {
            console.log(fieldNameList);
        };
    };

    addSpaceAtRight(fieldNameList, columnNameList, board) {
        if (this.plane === "vertical") {
            const rightColumnName = columnNameList.indexOf(fieldNameList[0][0]) + 1;
            if (rightColumnName < 10) {
                fieldNameList.map(fieldName =>(
                    board[rightColumnName][columnNameList[rightColumnName] + fieldName.slice(1)] = "space"
                ));
                this.getFirstElem(columnNameList[rightColumnName] + (fieldNameList[0][1]), columnNameList, board);
                this.getLastElem(columnNameList[rightColumnName] + (fieldNameList[fieldNameList.length - 1][1]), columnNameList, board);   
            };
        } else {
            console.log(fieldNameList);
        };
    };

    addSpaceAtBottom(fieldNameList, columnNameList, board) {
        if (this.plane === "vertical") {
            this.getLastElem(fieldNameList[fieldNameList.length - 1], columnNameList,board);
        } else {
            console.log(fieldNameList);
        };
    };

    addSpaceAtLeft(fieldNameList, columnNameList, board) {
        if (this.plane === "vertical") {
            const leftColumnName = columnNameList.indexOf(fieldNameList[0][0]) - 1;
            if (leftColumnName < 10) {
                fieldNameList.map(fieldName => (
                    board[leftColumnName][columnNameList[leftColumnName] + fieldName.slice(1)] = "space"
                    ));
                this.getFirstElem(columnNameList[leftColumnName] + (fieldNameList[0][1]), columnNameList, board);
                this.getLastElem(columnNameList[leftColumnName] + (fieldNameList[fieldNameList.length - 1][1]), columnNameList, board);
            };
        } else {
            console.log(fieldNameList);
        };
    };

    defineSpaceFieldName(fieldNameList, columnNameList, board) {
        this.plane === "vertical" && fieldNameList.sort(this.compareNumber);
        this.addSpaceAtTop(fieldNameList, columnNameList, board);
        this.addSpaceAtRight(fieldNameList, columnNameList, board);
        this.addSpaceAtBottom(fieldNameList, columnNameList, board);
        this.addSpaceAtLeft(fieldNameList, columnNameList, board);

        // console.log(column);
    };
};


export { AddSpaceAroundShip };