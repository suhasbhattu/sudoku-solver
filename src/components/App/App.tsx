import React, { useState } from 'react';
import SudokuBoard from '../SudokuBoard/SudokuBoard';
import ButtonPanel from '../ButtonPanel/ButtonPanel';
import ErrorBar from '../ErrorBar/ErrorBar';
import { validateDuplicatesInRows, validateDuplicatesInColumns, validateDuplicatesInBlocks } from '../../controller/SudokuValidator';
import { solveSudoku } from '../../controller/SudokuSolver';
import './App.css';

const App = () => {

  const

    constructSudoku = (): string[][] => {
      let Sudoku = [];
      for (let index = 0; index < 9; index++) {
        Sudoku.push(new Array(9).fill(''));
      }
      return Sudoku;
    },

    onResetBoard = () => {
      const updatedValues = constructSudoku();
      setSudokuValues(updatedValues);
      setErrorMessage('');
    },

    onInputChange = (rowNo: number, columnNo: number, value: string) => {
      if (value && validateDuplicatesInRows(sudokuValues, rowNo, value)) {
        setErrorMessage(`${value} is already present in a row.`);
      } else if (value && validateDuplicatesInColumns(sudokuValues, columnNo, value)) {
        setErrorMessage(`${value} is already present in a column.`);
      } else if (value && validateDuplicatesInBlocks(sudokuValues, rowNo, columnNo, value)) {
        setErrorMessage(`${value} is already present in a block.`);
      } else {
        let updatedValues = [...sudokuValues];
        updatedValues[rowNo][columnNo] = value;
        setSudokuValues(updatedValues);
        setErrorMessage('');
      }
    },

    onSolveButtonClick = () => {
      const updatedValues = solveSudoku(sudokuValues);
      setSudokuValues(updatedValues);
      setErrorMessage('');
    },

    [errorMessage, setErrorMessage] = useState(''),

    [sudokuValues, setSudokuValues] = useState(constructSudoku);

  return (
    <div className="SudokuSolver">
      <div className="AppTitle">
        <h1>Sudoku Solver</h1>
      </div>
      <SudokuBoard values={sudokuValues} handleChange={onInputChange} />
      <ErrorBar message={errorMessage} />
      <ButtonPanel resetBoard={onResetBoard} solveSudoku={onSolveButtonClick} />
    </div>
  );
}

export default App;
