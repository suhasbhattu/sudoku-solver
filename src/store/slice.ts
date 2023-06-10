import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ErrorMessage {
  isError: boolean;
  message: string;
}

export interface SudokuSolverState {
  sudokuGrid: (number | null)[][];
  activeCell: [number, number];
  errorMessage: ErrorMessage;
  possibilityArray: number[][][];
}

const initialState: SudokuSolverState = {
  sudokuGrid: new Array(9).fill(new Array(9).fill(null)),
  activeCell: [-1, -1],
  errorMessage: {
    isError: false,
    message: "",
  },
  possibilityArray: [],
};

export const slice = createSlice({
  name: "sudokuSolver",
  initialState,
  reducers: {
    resetGrid: (state) => {
      state.sudokuGrid = new Array(9).fill(new Array(9).fill(null));
      state.activeCell[0] = -1;
      state.activeCell[1] = -1;
    },
    setActiveCell: (state, action: PayloadAction<[number, number]>) => {
      state.activeCell[0] = action.payload[0];
      state.activeCell[1] = action.payload[1];
    },
    setGridValue: (state, action: PayloadAction<number | null>) => {
      const rowIndex = state.activeCell[0];
      const columnIndex = state.activeCell[1];
      state.sudokuGrid[rowIndex][columnIndex] = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<ErrorMessage>) => {
      state.errorMessage = action.payload;
    },
    setPossibilityArray: (state, action: PayloadAction<number[][][]>) => {
      state.possibilityArray = action.payload;
    },
  },
});

export const {
  resetGrid,
  setActiveCell,
  setGridValue,
  setErrorMessage,
  setPossibilityArray,
} = slice.actions;

export const selectGrid = (state: RootState) => state.sudokuSolver.sudokuGrid;

export const selectActiveCell = (state: RootState) =>
  state.sudokuSolver.activeCell;

export const selectErrorMessage = (state: RootState) =>
  state.sudokuSolver.errorMessage;

export const selectPossibilityArray = (state: RootState) =>
  state.sudokuSolver.possibilityArray;

export default slice.reducer;
