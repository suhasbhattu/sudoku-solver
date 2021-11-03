import { validateSudokuGrid, isSudokuSolved, validateDuplicatesInRows, validateDuplicatesInColumns, validateDuplicatesInBlocks } from './SudokuValidator';

export const initializePossibleValues = (values: string[][]): string[][][] => {

    let possibleValues: string[][][] = [],
        indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (const rowNo of indices) {
        possibleValues.push([]);
        for (const columnNo of indices) {
            possibleValues[rowNo].push([]);
            if (values[rowNo][columnNo] !== '') {
                possibleValues[rowNo][columnNo].push(values[rowNo][columnNo]);
            }
        }
    }

    return possibleValues;
};

export const populatePossibleValues = (values: string[][]): string[][][] => {

    let possibleValues = initializePossibleValues(values),
        indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (const rowNo of indices) {
        for (const colNo of indices) {
            if (values[rowNo][colNo] === '') {
                for (const value of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
                    if (!validateDuplicatesInRows(values, rowNo, value)
                        && !validateDuplicatesInColumns(values, colNo, value)
                        && !validateDuplicatesInBlocks(values, rowNo, colNo, value)) {
                        possibleValues[rowNo][colNo].push(value);
                    }
                }
            }
        }
    }

    return possibleValues;
};

export const addSinglePossibleValues = (values: string[][], possibleValuesList: string[][][]): [boolean, string[][]] => {

    let valueUpdated = false,
        indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (const rowNo of indices) {
        for (const colNo of indices) {
            if (possibleValuesList[rowNo][colNo].length === 1) {
                if (values[rowNo][colNo] === '') {
                    valueUpdated = true;
                }
                values[rowNo][colNo] = possibleValuesList[rowNo][colNo][0];
            }
        }
    }

    return [valueUpdated, values];
};

export const checkSinglePossibilityRow = (possibleValues: string[][][], rowNo: number) => {

    let possibleValuesMap: any = {},
        possibleSingleValue = [],
        row = possibleValues[rowNo],
        values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (const column of row) {
        for (const iterator of values) {
            if (column.length > 1) {
                if (column.includes(iterator)) {
                    possibleValuesMap[iterator] = possibleValuesMap[iterator] || {};
                    possibleValuesMap[iterator].rowNo = rowNo;
                    possibleValuesMap[iterator].columnNo = row.indexOf(column);
                    possibleValuesMap[iterator].count = (possibleValuesMap[iterator].count || 0) + 1;
                    possibleValuesMap[iterator].value = iterator;
                }
            }
        }
    }

    for (const iterator in possibleValuesMap) {
        if (possibleValuesMap[iterator].count === 1) {
            possibleSingleValue.push(possibleValuesMap[iterator]);
        }
    }

    return possibleSingleValue;
};

export const checkSinglePossibilityColumn = (possibleValues: string[][][], columnNo: number) => {

    let possibleValuesMap: any = {},
        possibleSingleValue = [],
        column = [],
        values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (const iterator of possibleValues) {
        column.push(iterator[columnNo]);
    }

    for (const iterator of column) {
        for (const iterator2 of values) {
            if (iterator.length > 1) {
                if (iterator.includes(iterator2)) {
                    possibleValuesMap[iterator2] = possibleValuesMap[iterator2] || {};
                    possibleValuesMap[iterator2].rowNo = column.indexOf(iterator);
                    possibleValuesMap[iterator2].columnNo = columnNo;
                    possibleValuesMap[iterator2].count = (possibleValuesMap[iterator2].count || 0) + 1;
                    possibleValuesMap[iterator2].value = iterator2;
                }
            }
        }
    }

    for (const iterator in possibleValuesMap) {
        if (possibleValuesMap[iterator].count === 1) {
            possibleSingleValue.push(possibleValuesMap[iterator]);
        }
    }

    return possibleSingleValue;
};

export const checkSinglePossibilityBlock = (possibleValues: string[][][], blockNo: number) => {

    let possibleValuesMap: any = {},
        possibleSingleValue = [],
        block = [],
        blockStart = [Math.floor(blockNo / 3) * 3, (blockNo % 3) * 3],
        values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let index = blockStart[0]; index < blockStart[0] + 3; index++) {
        for (let index2 = blockStart[1]; index2 < blockStart[1] + 3; index2++) {
            block.push(possibleValues[index][index2]);
        }
    }

    for (let index = 0; index < block.length; index++) {
        const iterator = block[index];
        for (const iterator2 of values) {
            if (iterator.length > 1) {
                if (iterator.includes(iterator2)) {
                    possibleValuesMap[iterator2] = possibleValuesMap[iterator2] || {};
                    possibleValuesMap[iterator2].rowNo = blockStart[0] + Math.floor(index / 3);
                    possibleValuesMap[iterator2].columnNo = blockStart[1] + (index % 3);
                    possibleValuesMap[iterator2].count = (possibleValuesMap[iterator2].count || 0) + 1;
                    possibleValuesMap[iterator2].value = iterator2;
                }
            }
        }
    }

    for (const iterator in possibleValuesMap) {
        if (possibleValuesMap[iterator].count === 1) {
            possibleSingleValue.push(possibleValuesMap[iterator]);
        }
    }
    return possibleSingleValue;
};

export const checkSinglePossibility = (values: string[][], possibleValuesList: string[][][]): [boolean, string[][]] => {

    let valueUpdated = false,
        iteratorIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (const iterator of iteratorIndices) {
        let possibleSingleValueRow = checkSinglePossibilityRow(possibleValuesList, iterator);
        for (const iterator2 of possibleSingleValueRow) {
            values[iterator2.rowNo][iterator2.columnNo] = iterator2.value;
            valueUpdated = true;
        }
        let possibleSingleValueColumn = checkSinglePossibilityColumn(possibleValuesList, iterator);
        for (const iterator2 of possibleSingleValueColumn) {
            values[iterator2.rowNo][iterator2.columnNo] = iterator2.value;
            valueUpdated = true;
        }
        let possibleSingleValueBlock = checkSinglePossibilityBlock(possibleValuesList, iterator);
        for (const iterator2 of possibleSingleValueBlock) {
            values[iterator2.rowNo][iterator2.columnNo] = iterator2.value;
            valueUpdated = true;
        }
    }

    return [valueUpdated, values];
};

export const solveSudoku = (sudokuValues: string[][]): string[][] => {

    let updatedValues = [...sudokuValues],
        possibleValues: string[][][] = [],
        isNotChanged = true,
        valueUpdated = false,
        indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    while (isNotChanged) {
        possibleValues = populatePossibleValues(updatedValues);
        [valueUpdated, updatedValues] = addSinglePossibleValues(updatedValues, possibleValues);
        isNotChanged = valueUpdated;

        if (validateSudokuGrid(updatedValues) && !valueUpdated) {
            [valueUpdated, updatedValues] = checkSinglePossibility(updatedValues, possibleValues);
            isNotChanged = valueUpdated;
        }

        valueUpdated = false;
    }

    if (!isSudokuSolved(updatedValues)) {
        let isSolved = false;

        isNotChanged = true;

        for (const rowNo of indices) {
            for (const colNo of indices) {
                if (possibleValues[rowNo][colNo].length > 1) {
                    for (const iterator of possibleValues[rowNo][colNo]) {
                        let copyUpdatedValues = updatedValues.map(o => o.slice());
                        copyUpdatedValues[rowNo][colNo] = iterator;
                        while (isNotChanged) {
                            possibleValues = populatePossibleValues(copyUpdatedValues);
                            [valueUpdated, copyUpdatedValues] = addSinglePossibleValues(copyUpdatedValues, possibleValues);
                            isNotChanged = valueUpdated;

                            if (validateSudokuGrid(updatedValues) && !valueUpdated) {
                                [valueUpdated, copyUpdatedValues] = checkSinglePossibility(copyUpdatedValues, possibleValues);
                                isNotChanged = valueUpdated;
                            }

                            valueUpdated = false;
                        }

                        if (isSudokuSolved(copyUpdatedValues) && validateSudokuGrid(copyUpdatedValues)) {
                            updatedValues = copyUpdatedValues;
                            isSolved = true;
                            break;
                        } else {
                            possibleValues = populatePossibleValues(updatedValues);
                            isNotChanged = true;
                        }
                    }
                    if (isSolved) {
                        break;
                    }
                }
            }
            if (isSolved) {
                break;
            }
        }
    }

   return updatedValues;
};