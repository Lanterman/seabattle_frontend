class BasicClass {

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
};


export { BasicClass };