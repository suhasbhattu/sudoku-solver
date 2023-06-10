const validateDuplication = (list: (number | null)[]) => {
  const updatedList = list.filter((item) => item !== null);
  return new Set(updatedList).size === updatedList.length;
};

const getColumnWiseGrid = (grid: (number | null)[][] | number[][][]) => {
  const updatedGrid = [];
  for (let index = 0; index < 9; index++) {
    updatedGrid.push(new Array(9).fill(null));
  }
  for (let index = 0; index < grid.length; index++) {
    for (let index2 = 0; index2 < grid.length; index2++) {
      updatedGrid[index][index2] = grid[index2][index];
    }
  }
  return updatedGrid;
};

const getBlockWiseGrid = (grid: (number | null)[][] | number[][][]) => {
  const updatedGrid = [];
  for (let index = 0; index < 9; index++) {
    updatedGrid.push(new Array(9).fill(null));
  }
  for (let index = 0; index < grid.length; index++) {
    for (let index2 = 0; index2 < grid.length; index2++) {
      let row = 3 * Math.floor(index / 3) + Math.floor(index2 / 3);
      let column = 3 * (index % 3) + (index2 % 3);
      updatedGrid[row][column] = grid[index][index2];
    }
  }
  return updatedGrid;
};

const validateRows = (grid: (number | null)[][]) => {
  let hasError = false;
  let rowNumber = -1;
  for (let index = 0; index < grid.length; index++) {
    const row = grid[index];
    if (!validateDuplication(row)) {
      hasError = true;
      rowNumber = index;
      break;
    }
  }
  return {
    hasError: hasError,
    number: rowNumber,
  };
};

const validateColumns = (grid: (number | null)[][]) => {
  let hasError = false;
  let columnNumber = -1;
  const updatedGrid = getColumnWiseGrid(grid);
  for (let index = 0; index < updatedGrid.length; index++) {
    const row = updatedGrid[index];
    if (!validateDuplication(row)) {
      hasError = true;
      columnNumber = index;
      break;
    }
  }
  return {
    hasError: hasError,
    number: columnNumber,
  };
};

const validateSubGrid = (grid: (number | null)[][]) => {
  let hasError = false;
  let gridNumber = -1;
  const updatedGrid = getBlockWiseGrid(grid);
  for (let index = 0; index < updatedGrid.length; index++) {
    const row = updatedGrid[index];
    if (!validateDuplication(row)) {
      hasError = true;
      gridNumber = index;
      break;
    }
  }
  return {
    hasError: hasError,
    number: gridNumber,
  };
};

const validateSudoku = (grid: (number | null)[][]) => {
  let hasError = false;
  let errorMessage = "";

  const rowsValidation = validateRows(grid);
  if (rowsValidation.hasError) {
    hasError = true;
    errorMessage = `Row ${rowsValidation.number} has a dupliacte value.`;
  } else {
    const columnsValidation = validateColumns(grid);
    if (columnsValidation.hasError) {
      hasError = true;
      errorMessage = `Column ${columnsValidation.number} has a duplicate value.`;
    } else {
      const blockValidation = validateSubGrid(grid);
      if (blockValidation.hasError) {
        hasError = true;
        errorMessage = `Block ${blockValidation.number} has a duplicate value.`;
      }
    }
  }

  return {
    hasError: hasError,
    errorMessage: errorMessage,
  };
};

const buildPossibilityArray = (grid: (number | null)[][]) => {
  const possibilityArray: number[][][] = [];
  for (let index = 0; index < 9; index++) {
    possibilityArray.push([]);
    for (let index2 = 0; index2 < 9; index2++) {
      possibilityArray[index][index2] = [];
    }
  }

  for (let index = 0; index < grid.length; index++) {
    for (let index2 = 0; index2 < grid.length; index2++) {
      if (grid[index][index2] === null) {
        possibilityArray[index][index2] = [];
        let rowNumber = index;
        let columnNumber = index2;
        let blockNumber = 3 * Math.floor(index / 3) + Math.floor(index2 / 3);
        let row = grid[rowNumber];
        let column = getColumnWiseGrid(grid)[columnNumber];
        let block = getBlockWiseGrid(grid)[blockNumber];
        for (let i = 1; i < 10; i++) {
          if (!row.includes(i) && !column.includes(i) && !block.includes(i)) {
            possibilityArray[index][index2].push(i);
          }
        }
      } else {
        possibilityArray[index][index2] = [grid[index][index2] ?? -1];
      }
    }
  }

  return possibilityArray;
};

const sudokuGridUtils = {
  validateSudoku: validateSudoku,
  buildPossibilityArray: buildPossibilityArray,
};

export default sudokuGridUtils;
