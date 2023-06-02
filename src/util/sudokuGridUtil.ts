const validateSudokuRow = (grid: (number | null)[][]) => {
  let flag = false;
  for (const index of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
    const filteredRow = grid[index].filter((item) => item !== null);
    const set = new Set(filteredRow);
    if (set.size !== filteredRow.length) {
      flag = true;
      break;
    }
  }
  return {
    isError: flag,
    message: "Row cannot have same values",
  };
};

const sudokuGridUtils = {
  validateSudokuRow: validateSudokuRow,
};

export default sudokuGridUtils;
