import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sudokuGridUtils from "../../util/sudokuGridUtil";
import {
  resetGrid,
  selectErrorMessage,
  selectPossibilityArray,
  selectSolvingMode,
  setActiveCell,
  setErrorMessage,
  setGridValueFromIndices,
  setSolvingMode,
} from "../../store/slice";

import "./ActionToolbar.css";

const ActionToolbar = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const solvingMode = useSelector(selectSolvingMode);
  const possibilityArray = useSelector(selectPossibilityArray);
  const { getSinglePossibility } = sudokuGridUtils;

  const onResetPress = () => {
    dispatch(resetGrid());
  };

  const onSolvePress = () => {
    dispatch(setActiveCell([-1, -1]));
    dispatch(setSolvingMode(true));
    dispatch(
      setErrorMessage({
        state: 'Processing',
        message: "Solving..",
      })
    );
  };

  const sleep = useCallback(
    async (result: number[], msec: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch(setGridValueFromIndices([result[0], result[1], result[2]]));
          resolve(msec);
        }, msec);
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const solveSudoku = async () => {
      if (solvingMode) {
        const result = getSinglePossibility(possibilityArray);
        if (result.length > 0) {
          await sleep(result, 100);
        } else {
          dispatch(setSolvingMode(false));
          dispatch(
            setErrorMessage({
              state: 'Success',
              message: "Sudoku got solved!!",
            })
          );
        }
      }
    };
    solveSudoku();
  }, [solvingMode, dispatch, getSinglePossibility, possibilityArray, sleep]);

  return (
    <div className="ActionToolbar">
      <button
        className="ActionToolbar-button"
        disabled={errorMessage.state === 'Error'}
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
