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
}

const initialState: SudokuSolverState = {
  sudokuGrid: new Array(9).fill(new Array(9).fill(null)),
  activeCell: [-1, -1],
  errorMessage: {
    isError: false,
    message: "",
  },
};

export const slice = createSlice({
  name: "sudokuSolver",
  initialState,
  reducers: {
    resetGrid: (state) => {
      state.sudokuGrid = new Array(9).fill(new Array(9).fill(null));
    },
    setActiveCell: (state, action: PayloadAction<[number, number]>) => {
      state.activeCell[0] = action.payload[0];
      state.activeCell[1] = action.payload[1];
    },
    setGridValue: (state, action: PayloadAction<number>) => {
      const rowIndex = state.activeCell[0];
      const columnIndex = state.activeCell[1];
      state.sudokuGrid[rowIndex][columnIndex] = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<ErrorMessage>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { resetGrid, setActiveCell, setGridValue, setErrorMessage } =
  slice.actions;

export const selectGrid = (state: RootState) => state.sudokuSolver.sudokuGrid;

export const selectActiveCell = (state: RootState) =>
  state.sudokuSolver.activeCell;

export const selectErrorMessage = (state: RootState) =>
  state.sudokuSolver.errorMessage;

export default slice.reducer;
