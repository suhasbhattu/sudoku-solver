import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveCell,
  selectErrorMessage,
  selectGrid,
  selectSolvingMode,
  setActiveCell,
  setErrorMessage,
  setGridValue,
  setPossibilityArray,
} from "../../store/slice";
import useSudokuGrid from "../../util/sudokuGridUtil";

import "./SudokuGrid.css";

const SudokuGrid = () => {
  const sudokuGrid = useSelector(selectGrid);
  const errorMessage = useSelector(selectErrorMessage);
  const activeCell = useSelector(selectActiveCell);
  const solvingMode = useSelector(selectSolvingMode);
  const dispatch = useDispatch();
  const { validateSudoku, buildPossibilityArray } = useSudokuGrid();

  const onCellClick = (rowNumber: number, columnNumber: number) => {
    dispatch(setActiveCell([rowNumber, columnNumber]));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value > 0) {
      dispatch(setGridValue(value % 10));
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      dispatch(setGridValue(null));
    }
  };

  const getRows = () => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return indices.map((rowIndex) => {
      const getColumns = () => {
        return indices.map((columnIndex) => {
          const classesList = ["SudokuGridCell"];
          if (rowIndex === 0) {
            classesList.push("TopBorder");
          }
          if ([2, 5, 8].includes(columnIndex)) {
            classesList.push("RightBorder");
          }
          if ([2, 5, 8].includes(rowIndex)) {
            classesList.push("BottomBorder");
          }
          if (columnIndex === 0) {
            classesList.push("LeftBorder");
          }
          if (rowIndex === activeCell[0] && columnIndex === activeCell[1]) {
            classesList.push("ActiveCell");
          }
          const className = classesList.join(" ");
          return (
            <td
              key={`cell-${rowIndex}${columnIndex}`}
              className={className}
              onClick={() => onCellClick(rowIndex, columnIndex)}
            >
              <input
                type="text"
                className={"SudokuGridInput"}
                value={sudokuGrid[rowIndex][columnIndex] ?? ""}
                readOnly={solvingMode}
                onChange={(event) => onChange(event)}
                onKeyDown={(event) => onKeyDown(event)}
                onFocus={() => onCellClick(rowIndex, columnIndex)}
              />
            </td>
          );
        });
      };
      return <tr key={`row-${rowIndex}`}>{getColumns()}</tr>;
    });
  };

  useEffect(() => {
    const validateResult = validateSudoku(sudokuGrid);
    if (
      (errorMessage.state === "Error" && !validateResult.hasError) ||
      (errorMessage.state === "None" && validateResult.hasError)
    ) {
      dispatch(
        setErrorMessage({
          state: validateResult.hasError ? "Error" : "None",
          message: validateResult.errorMessage,
        })
      );
    }
    const possibilityArray = buildPossibilityArray(sudokuGrid);
    dispatch(setPossibilityArray(possibilityArray));
  }, [
    sudokuGrid,
    validateSudoku,
    dispatch,
    buildPossibilityArray,
    errorMessage.state,
  ]);

  return (
    <div className="SudokuGrid">
      <table className="SudokuGrid-Table">
        <tbody>{getRows()}</tbody>
      </table>
    </div>
  );
};

export default SudokuGrid;
