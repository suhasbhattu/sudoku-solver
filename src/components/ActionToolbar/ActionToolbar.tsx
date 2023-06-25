import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetGrid,
  selectBacktrackModeOn,
  selectErrorMessage,
  selectGrid,
  selectPossibilityArray,
  selectSolvingMode,
  setActiveCell,
  setBacktrackModeOn,
  setErrorMessage,
  setGridValueFromIndices,
  setSolvingMode,
} from "../../store/slice";
import sudokuGridUtils from "../../util/sudokuGridUtil";

import "./ActionToolbar.css";

const ActionToolbar = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const solvingMode = useSelector(selectSolvingMode);
  const sudokuGrid = useSelector(selectGrid);
  const possibilityArray = useSelector(selectPossibilityArray);
  const backtrackModeOn = useSelector(selectBacktrackModeOn);
  const { getSinglePossibility, isSudokuSolved, validateSudoku } =
    sudokuGridUtils;

  const onResetPress = () => {
    dispatch(resetGrid());
  };

  const onSolvePress = () => {
    dispatch(setActiveCell([-1, -1]));
    dispatch(setSolvingMode(true));
    dispatch(
      setErrorMessage({
        state: "Processing",
        message: "Solving..",
      })
    );
  };

  const sleep = async (msec: number) =>
    new Promise((resolve) => setTimeout(resolve, msec));

  useEffect(() => {
    const solveSudoku = async () => {
      const result = getSinglePossibility(possibilityArray);
      if (result.length > 0) {
        await sleep(100);
        dispatch(setGridValueFromIndices([result[0], result[1], result[2]]));
      } else {
        if (isSudokuSolved(sudokuGrid) && validateSudoku(sudokuGrid)) {
          dispatch(setSolvingMode(false));
          dispatch(
            setErrorMessage({
              state: "Success",
              message: "Sudoku is getting solved!!",
            })
          );
        } else {
          dispatch(setSolvingMode(false));
          dispatch(setBacktrackModeOn(true));
        }
      }
    };

    if (solvingMode) {
      solveSudoku();
    }
  }, [
    solvingMode,
    getSinglePossibility,
    possibilityArray,
    dispatch,
    isSudokuSolved,
    sudokuGrid,
    validateSudoku,
  ]);

  useEffect(() => {
    const performbackTrack = () => {
      dispatch(setBacktrackModeOn(false));
    };
    if (backtrackModeOn) {
      performbackTrack();
    }
  }, [backtrackModeOn, dispatch]);

  return (
    <div className="ActionToolbar">
      <button
        className="ActionToolbar-button"
        disabled={errorMessage.state === "Error"}
        onClick={onSolvePress}
      >
        Solve
      </button>
      <button className="ActionToolbar-button" onClick={onResetPress}>
        Reset
      </button>
    </div>
  );
};

export default ActionToolbar;
