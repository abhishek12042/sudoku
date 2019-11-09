const cellElemArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const quardCellMap = {
    "1": ["00", "01", "02", "10", "11", "12", "20", "21", "22"],
    "2": ["03", "04", "05", "13", "14", "15", "23", "24", "25"],
    "3": ["06", "07", "08", "16", "17", "18", "26", "27", "28"],
    "4": ["30", "31", "32", "40", "41", "42", "50", "51", "52"],
    "5": ["33", "34", "35", "43", "44", "45", "53", "54", "55"],
    "6": ["36", "37", "38", "46", "47", "48", "56", "57", "58"],
    "7": ["60", "61", "62", "70", "71", "72", "80", "81", "82"],
    "8": ["63", "64", "65", "73", "74", "75", "83", "84", "85"],
    "9": ["66", "67", "68", "76", "77", "78", "86", "87", "88"]
}

const quardLocMap = {
    "1": [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]],
    "2": [["03", "04", "05"], ["13", "14", "15"], ["23", "24", "25"]],
    "3": [["06", "07", "08"], ["16", "17", "18"], ["26", "27", "28"]],
    "4": [["30", "31", "32"], ["40", "41", "42"], ["50", "51", "52"]],
    "5": [["33", "34", "35"], ["43", "44", "45"], ["53", "54", "55"]],
    "6": [["36", "37", "38"], ["46", "47", "48"], ["56", "57", "58"]],
    "7": [["60", "61", "62"], ["70", "71", "72"], ["80", "81", "82"]],
    "8": [["63", "64", "65"], ["73", "74", "75"], ["83", "84", "85"]],
    "9": [["66", "67", "68"], ["76", "77", "78"], ["86", "87", "88"]]
}
const qLoc = {
    "1": { "i": "02", "j": "02" }, "2": { "i": "02", "j": "35" }, "3": { "i": "02", "j": "68" },
    "4": { "i": "35", "j": "02" }, "5": { "i": "35", "j": "35" }, "6": { "i": "35", "j": "68" },
    "7": { "i": "68", "j": "02" }, "8": { "i": "68", "j": "35" }, "9": { "i": "68", "j": "68" }
}

var puzz = [
    [1, 0, 0, 5, 6, 0, 0, 4, 0],
    [2, 0, 8, 0, 0, 0, 1, 0, 0],
    [5, 0, 0, 8, 9, 0, 0, 0, 7],
    [0, 0, 5, 4, 0, 7, 0, 0, 0],
    [0, 1, 0, 0, 2, 0, 0, 8, 0],
    [0, 0, 0, 6, 0, 8, 9, 0, 0],
    [8, 0, 0, 0, 4, 3, 0, 0, 1],
    [0, 0, 9, 0, 0, 0, 5, 0, 2],
    [0, 3, 0, 0, 7, 5, 0, 0, 8],
]
let step1Res = step1(puzz);

console.log(JSON.stringify(step1Res));

function step1(initialpuzz) {
    let puzzSt = JSON.stringify(initialpuzz);
    let puzz = JSON.parse(puzzSt);
    let checkPuzzSt = JSON.stringify(puzz);
    let checkPuzz = JSON.parse(checkPuzzSt);
    let stop = false;
    while (!stop) {
        let rule1Res = rule1(puzz);
        let rule2Res = rule2(rule1Res);
        let rule3Res = rule3(rule2Res);
        puzz = rule3Res; let checkSt = JSON.stringify(puzz);
        let checkPuzzSt = JSON.stringify(checkPuzz);
        if (checkSt == checkPuzzSt) {
            stop = true;
        } else {
            checkPuzz = puzz;
        }
    }
    return puzz;
}

function rule1(puzz) {
    let puzzCloneSt = JSON.stringify(puzz);
    let instaPuzz = JSON.parse(puzzCloneSt);
    let puzzClone = JSON.parse(puzzCloneSt);
    let stop = false;
    while (!stop) {
        for (let horz = 0; horz < 9; horz++) {
            for (let vert = 0; vert < 9; vert++) {
                if (puzzClone[horz][vert] == 0) {
                    let horzValue = getHorzValue(horz, puzzClone);
                    let vertValue = getVertValue(vert, puzzClone);
                    let quardNum = getQuardNum(`${horz}${vert}`);
                    let quardValue = getQuardValue(quardNum, puzzClone);
                    let possibilities = getPossibilities(horzValue, vertValue, quardValue);
                    if (possibilities.can.length == 1) {
                        puzzClone[horz][vert] = possibilities.can[0];
                    }
                }
            }
        }
        if (JSON.stringify(instaPuzz) == JSON.stringify(puzzClone)) {
            stop = true;
        }
        else {
            instaPuzz = puzzClone;
        }
    }
    return puzzClone;
}

function rule2(puzz) {
    let instaPuzz = puzz;
    let puzzClone = puzz;
    let stop = false;
    while (!stop) {
        for (let horz = 0; horz < 9; horz++) {
            for (let vert = 0; vert < 9; vert++) {
                if (puzzClone[horz][vert] == 0) {
                    let currentLoc = `${horz}${vert}`;
                    let quardNum = getQuardNum(currentLoc);
                    let checkLoc = getHorzVertLocToCheck(quardNum, currentLoc);
                    for (let i = 1; i <= 9; i++) {
                        let initialCheck1 = getFlatened(getQuardValue(quardNum, puzzClone)).includes(i);
                        let initialCheck2 = getHorzValue(horz, puzzClone).includes(i);
                        let initialCheck3 = getVertValue(vert, puzzClone).includes(i);
                        let initialCheckCombo = initialCheck1 || initialCheck2 || initialCheck3 ? true : false;
                        if (!initialCheckCombo) {
                            let insertStatus = checkForInsert(i, checkLoc, puzzClone);
                            if (insertStatus) {
                                puzzClone[horz][vert] = i;
                            }
                        }
                    }
                }
            }
        }
        if (JSON.stringify(instaPuzz) == JSON.stringify(puzzClone)) {
            stop = true;
        }
        else {
            instaPuzz = puzzClone;
        }
    }
    return puzzClone;
}

function rule3(puzz) {
    let initPuzzSt = JSON.stringify(puzz);
    let initPuzz = JSON.parse(initPuzzSt);
    let quardLocMapCloneSt = JSON.stringify(quardLocMap);
    let quardLocMapClone = JSON.parse(quardLocMapCloneSt);
    for (let [Key, value] of Object.entries(quardLocMapClone)) {
        let emptyCount = 0;
        let quardEmptLoc;
        let currentQuardValues = [];
        for (let quardLocElem of value) {
            for (let indiLoc of quardLocElem) {
                let locValue = initPuzz[indiLoc.split('')[0]][[indiLoc.split('')[1]]];
                currentQuardValues.push(locValue);
                if (locValue == 0) {
                    emptyCount++;
                    quardEmptLoc = indiLoc;
                }
            }
        }
        if (emptyCount == 1) {
            for (let i = 1; i <= 9; i++) {
                if (!currentQuardValues.includes(i)) {
                    initPuzz[quardEmptLoc.split('')[0]][[quardEmptLoc.split('')[1]]] = i;
                }
            }
        }
    } return initPuzz;
}

function checkForInsert(i, checkLoc, puzzClone) {
    let hStatus1 = getVertValue(checkLoc.horz[0].split('')[0], puzzClone).includes(i) ? true : false;
    let hStatus2 = getVertValue(checkLoc.horz[1].split('')[0], puzzClone).includes(i) ? true : false;
    let vStatus1 = getHorzValue(checkLoc.vert[0].split('')[1], puzzClone).includes(i) ? true : false;
    let vStatus2 = getHorzValue(checkLoc.vert[1].split('')[1], puzzClone).includes(i) ? true : false;
    let insertStatus = false;
    if (hStatus1 && hStatus2 && vStatus1 && vStatus2) {
        insertStatus = true;
    }
    return insertStatus;
}

function getPossibilities(horzValue, vertValue, quardValue) {
    let np1 = [... new Set(horzValue)].filter(val => val !== 0);
    let np2 = [... new Set(vertValue)].filter(val => val !== 0);
    let np3 = getFlatened(quardValue).filter(val => val !== 0);
    let cant = [...new Set([...np1, ...np2, ...np3])];
    let can = cellElemArr.filter((item) => !cant.includes(item));
    return { "can": can, "cant": cant };
}

function getFlatened(matx) {
    let flattnedArr = [];
    for (let i = 0; i < matx.length; i++) {
        for (let j = 0; j < matx[i].length; j++) {
            if (!flattnedArr.includes(matx[i][j])) {
                flattnedArr.push(matx[i][j]);
            }
        }
    }
    return flattnedArr;
}

function getQuardNum(loc) {
    for (let [key, value] of Object.entries(quardCellMap)) {
        if (value.includes(loc))
            return key;
    }
}

function getHorzValue(horzNo, puzzClone) {
    return puzzClone[horzNo];
}

function getVertValue(vertNo, puzzClone) {
    let vertValue = [];
    for (let i = 0; i < 9; i++) {
        vertValue.push(puzzClone[i][vertNo]);
    }
    return vertValue;
}

function getQuardValue(q, puzzClone) {
    let quardValue = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let iStart = parseInt(qLoc[q].i.split('')[0]), iEnd = parseInt(qLoc[q].i.split('')[1]);
    let jStart = parseInt(qLoc[q].j.split('')[0]), jEnd = parseInt(qLoc[q].j.split('')[1]);
    let x = 0;
    for (let i = iStart; i <= iEnd; i++) {
        let y = 0;
        for (let j = jStart; j <= jEnd; j++) {
            quardValue[x][y] = puzzClone[i][j];
            y++;
        }
        if (y == 2) y = 0;
        x++;
    }
    return quardValue;
}

function getHorzVertLocToCheck(quardNum, initLock) {
    let checkLoc = { "horz": [], "vert": [] };
    let quardLocMapSt = JSON.stringify(quardLocMap);
    let quardLocMapClone = JSON.parse(quardLocMapSt);
    let currentQuardData = quardLocMapClone[quardNum];
    for (let i = 0; i < currentQuardData.length; i++) {
        if (currentQuardData[i].includes(initLock)) {
            checkLoc.horz = currentQuardData[i];
        }
    }
    let vertArr = [];
    let iloc = initLock.split('')[0];
    let jloc = initLock.split('')[1];
    let currentQuardLocks = quardCellMap[quardNum];
    for (let i = iloc - 2; i <= iloc + 2; i++) {
        for (let x = 0; x < currentQuardLocks.length; x++) {
            if (currentQuardLocks[x] == `${i}${jloc}`) {
                vertArr.push(`${i}${jloc}`);
            }
        }
    }
    checkLoc.vert = vertArr;
    let indexOfInitLocHorz = checkLoc.horz.indexOf(initLock);
    let indexOfInitLocVert = checkLoc.vert.indexOf(initLock);
    checkLoc.horz.splice(indexOfInitLocHorz, 1);
    checkLoc.vert.splice(indexOfInitLocVert, 1);
    return checkLoc;
}