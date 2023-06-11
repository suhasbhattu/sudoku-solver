import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ErrorMessage {
  state: "Error" | "Success" | "Processing" | "None";
  message: string;
}

export interface SudokuSolverState {
  sudokuGrid: (number | null)[][];
  activeCell: [number, number];
  errorMessage: ErrorMessage;
  possibilityArray: (number[] | null)[][];
  solvingMode: boolean;
}

const initialState: SudokuSolverState = {
  sudokuGrid: new Array(9).fill(new Array(9).fill(null)),
  activeCell: [-1, -1],
  errorMessage: {
    state: "None",
    message: "",
  },
  possibilityArray: [],
  solvingMode: false,
};

export const slice = createSlice({
  name: "sudokuSolver",
  initialState,
  reducers: {
    resetGrid: (state) => {
      state.sudokuGrid = new Array(9).fill(new Array(9).fill(null));
      state.activeCell[0] = -1;
      state.activeCell[1] = -1;
      state.errorMessage.state = "None";
      state.errorMessage.message = "";
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
    setPossibilityArray: (
      state,
      action: PayloadAction<(number[] | null)[][]>
    ) => {
      state.possibilityArray = action.payload;
    },
    setGridValueFromIndices: (
      state,
      action: PayloadAction<[number, number, number]>
    ) => {
      state.sudokuGrid[action.payload[0]][action.payload[1]] =
        action.payload[2];
    },
    setSolvingMode: (state, action: PayloadAction<boolean>) => {
      state.solvingMode = action.payload;
    },
  },
});

export const {
  resetGrid,
  setActiveCell,
  setGridValue,
  setErrorMessage,
  setPossibilityArray,
  setGridValueFromIndices,
  setSolvingMode,
} = slice.actions;

export const selectGrid = (state: RootState) => state.sudokuSolver.sudokuGrid;

export const selectActiveCell = (state: RootState) =>
  state.sudokuSolver.activeCell;

export const selectErrorMessage = (state: RootState) =>
  state.sudokuSolver.errorMessage;

export const selectPossibilityArray = (state: RootState) =>
  state.sudokuSolver.possibilityArray;

export const selectSolvingMode = (state: RootState) =>
  state.sudokuSolver.solvingMode;

export default slice.reducer;
