import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveCell,
  selectGrid,
  setActiveCell,
  setErrorMessage,
  setGridValue,
} from "../../store/slice";
import sudokuGridUtils from "../../util/sudokuGridUtil";

import "./SudokuGrid.css";

const SudokuGrid = () => {
  const sudokuGrid = useSelector(selectGrid);
  const activeCell = useSelector(selectActiveCell);
  const { validateSudokuRow } = sudokuGridUtils;
  const dispatch = useDispatch();

  const onCellClick = (rowNumber: number, columnNumber: number) => {
    dispatch(setActiveCell([rowNumber - 1, columnNumber - 1]));
  };

  const onKeyPress = (event: any) => {
    const value = Number(event.key);
    if (!isNaN(value) && value > 0) {
      dispatch(setGridValue(value));
    } else if (event.key === "Tab") {
      const columnIndex = (event.target.cellIndex + 1) % 9;
      const rowIndex =
        columnIndex === 0
          ? event.target.parentElement.rowIndex + 1
          : event.target.parentElement.rowIndex;
      dispatch(setActiveCell([rowIndex, columnIndex]));
    }
    const rowValidation = validateSudokuRow(sudokuGrid);
    dispatch(
      setErrorMessage({
        isError: rowValidation.isError,
        message: rowValidation.message,
      })
    );
  };

  const getRows = () => {
    const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return indices.map((rowIndex) => {
      const getColumns = () => {
        return indices.map((columnIndex) => {
          const classesList = ["SudokuGridCell"];
          if (rowIndex === 1) {
            classesList.push("TopBorder");
          }
          if ([3, 6, 9].includes(columnIndex)) {
            classesList.push("RightBorder");
          }
          if ([3, 6, 9].includes(rowIndex)) {
            classesList.push("BottomBorder");
          }
          if (columnIndex === 1) {
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
              tabIndex={0}
            >
              {sudokuGrid[rowIndex - 1][columnIndex - 1] ?? ""}
            </td>
          );
        });
      };
      return <tr key={`row-${rowIndex}`}>{getColumns()}</tr>;
    });
  };

  return (
    <div className="SudokuGrid">
      <table className="SudokuGrid-Table" onKeyDown={onKeyPress}>
        <tbody>{getRows()}</tbody>
      </table>
    </div>
  );
};

export default SudokuGrid;
