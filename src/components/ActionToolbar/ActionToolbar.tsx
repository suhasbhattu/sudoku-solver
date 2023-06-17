import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import sudokuGridUtils from "../../util/sudokuGridUtil";
import {
  resetGrid,
  selectErrorMessage,
  selectGrid,
  selectPossibilityArray,
  selectSolvingMode,
  setActiveCell,
  setErrorMessage,
  setGridValueFromIndices,
  setSolvingMode,
  selectBacktrackModeOn,
  selectBacktrackStack,
  setBacktrackStack,
  selectRollabckModeOn,
} from "../../store/slice";

import "./ActionToolbar.css";

const ActionToolbar = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const solvingMode = useSelector(selectSolvingMode);
  const possibilityArray = useSelector(selectPossibilityArray);
  const sudokuGrid = useSelector(selectGrid);
  const backtrackModeOn = useSelector(selectBacktrackModeOn);
  const rollbackModeOn = useSelector(selectRollabckModeOn);
  const backtrackStack = useSelector(selectBacktrackStack);
  const {
    getSinglePossibility,
    isSudokuSolved,
    getFirstBacktrackValue,
    validateSudoku,
  } = sudokuGridUtils;

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

  const sleep = useCallback(
    async (result: number[], msec: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch(
            setGridValueFromIndices([
              result[0],
              result[1],
              result[2] === -1 ? null : result[2],
            ])
          );
          if (backtrackModeOn && !rollbackModeOn) {
            const stackClone = cloneDeep(backtrackStack);
            stackClone.push({
              row: result[0],
              column: result[1],
              value: result[2],
            });
            dispatch(setBacktrackStack(stackClone));
          }
          resolve(msec);
        }, msec);
      });
    },
    [dispatch, backtrackModeOn, backtrackStack, rollbackModeOn]
  );

  useEffect(() => {
    const solveSudoku = async () => {
      if (solvingMode) {
        const result = getSinglePossibility(possibilityArray);
        if (result.length > 0 && !rollbackModeOn) {
          await sleep(result, 100);
        } else {
          if (isSudokuSolved(sudokuGrid)) {
            dispatch(setSolvingMode(false));
            dispatch(
              setErrorMessage({
                state: "Success",
                message: "Sudoku got solved!!",
              })
            );
          }
        }
      }
    };
    solveSudoku();
  }, [
    solvingMode,
    dispatch,
    getSinglePossibility,
    possibilityArray,
    sleep,
    isSudokuSolved,
    sudokuGrid,
    getFirstBacktrackValue,
    backtrackStack,
    validateSudoku,
    rollbackModeOn,
  ]);

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
