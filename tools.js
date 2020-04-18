exports.printMatrix = (mat) => {
    printMatrix(mat);
}
exports.getValueOnCordinate = (mat) => {
    getValueOnCordinate(mat);
}
exports.getRowValues = (mat) => {
    getRowValues(mat);
}
exports.getColumnValues = (mat) => {
    getColumnValues(mat);
}
exports.searchInRow = (mat, row, num) => {
    searchInRow(mat, row, num);
}


const searchInColumn = (mat, column, num) => {
    let columnArr = getColumnValues(mat, column);
    return columnArr.includes(num);
}

const searchInRow = (mat, row, num) => {
    let rowArr = getRowValues(mat, row);
    return rowArr.includes(num);
}

const getRowValues = (mat, row) => {
    return mat[row];
};

const getColumnValues = (mat, column) => {
    let columnArr = [];
    for (let row = 0; row < 9; row++) {
        columnArr.push(mat[row][column])
    }
    return columnArr;
}

const getValueOnCordinate = (mat, columnCO, rowCO) => {
    return mat[columnCO][rowCO];
};

const printMatrix = (mat) => {
    let rowStr = '';
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            rowStr = `${rowStr} ${mat[row][column]}`
        }
        rowStr = rowStr + "\n"
    }
    console.log(rowStr)
}