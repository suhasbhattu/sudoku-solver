/**
 * Validator for Sudoku Grid
 */

export const validateDuplicatesInRows = (sudokuValues: string[][], rowNo: number, value: string): boolean => sudokuValues[rowNo].includes(value);

export const validateDuplicatesInColumns = (sudokuValues: string[][], columnNo: number, value: string): boolean => sudokuValues.find(row => row[columnNo] === value) ? true : false;

export const validateDuplicatesInBlocks = (sudokuValues: string[][], rowNo: number, columnNo: number, value: string): boolean => {

    const

        blockStarts = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]],

        includedBlock: number[] | undefined = blockStarts.find(start => rowNo >= start[0] && columnNo >= start[1] && rowNo < start[0] + 3 && columnNo < start[1] + 3),

        findInBlock = (block: number[]) => {
            let isFound = false;
            for (let index = block[0]; index < block[0] + 3; index++) {
                for (let index2 = block[1]; index2 < block[1] + 3; index2++) {
                    if (sudokuValues[index][index2] === value) {
                        isFound = true;
                        break;
                    }
                }
            }
            return isFound;
        };

    return includedBlock ? findInBlock(includedBlock) : false;
};

export const checkDuplicatesInArray = (values: string[][]): boolean => {
    let isValid = true;
    for (const row of values) {
        const nonEmptyRow = row.filter(value => value !== '');
        if (new Set(nonEmptyRow).size !== nonEmptyRow.length) {
            isValid = false;
            break;
        }
    }
    return isValid;
};

export const validateSudokuGrid = (sudokuValues: string[][]): boolean => {

    let isValid = true;

    // Validate rows are correct

    isValid = checkDuplicatesInArray(sudokuValues);

    // Validate columns are correct

    if (isValid) {
        let invertedValues: string[][] = [];

        // First make copy of original values
        let count = 0;
        while (count < 9) {
            invertedValues[count] = sudokuValues[count].slice();
            count++;
        }

        // Then invert the sudoku values
        for (const row of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
            for (const column of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
                invertedValues[row][column] = sudokuValues[column][row];
            }
        }

        isValid = checkDuplicatesInArray(invertedValues);
    }

    // Validate blocks are correct
    if (isValid) {

        let blockValues: string[][] = [],
            count = 0;

        const blockStarts = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]];

        for (let index = 0; index < 9; index++) {
            blockValues[index] = [];
        }

        for (const start of blockStarts) {
            for (let index = start[0]; index < start[0] + 3; index++) {
                for (let index2 = start[1]; index2 < start[1] + 3; index2++) {
                    blockValues[count].push(sudokuValues[index][index2]);
                }
            }
            count++;
        }
        isValid = checkDuplicatesInArray(blockValues);
    }

    return isValid;
};

export const isSudokuSolved = (values: string[][]): boolean => {
    let isSolved = true;

    for (const rows of values) {
        const match = rows.find(row => row === '');
        if (match === '') {
            isSolved = false;
            break;
        }
    }
    return isSolved;
};