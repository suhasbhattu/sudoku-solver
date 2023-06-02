import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import sudokuSolverReducer from "./slice";

export const store = configureStore({
  reducer: {
    sudokuSolver: sudokuSolverReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
