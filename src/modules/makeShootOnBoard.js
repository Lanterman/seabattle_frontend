class MakeShootOnBoard {

    makeShoot(fieldName, column) {
        column[fieldName] ? column[fieldName] = "hit" : column[fieldName] = "miss";
        return column;
    }
};


export { MakeShootOnBoard };
