import React from 'react';
import SudokuCell from '../SudokuCell/SudokuCell';
import './SudokuBoard.css';

interface SudokuBoardProps {
    values: string[][];
    handleChange: Function;
}

const SudokuBoard = (props: SudokuBoardProps) => {

    let rows = new Array(9).fill(0).map((row, rowIndex) => {
        let columns = new Array(9).fill(0).map((col, colIndex) => {
            let classList = ['SudokuCell'];
            if ([0, 3, 6].includes(colIndex)) {
                classList.push('LeftBorder');
            } else if (colIndex === 8) {
                classList.push('RightBorder');
            }
            if ([0, 3, 6].includes(rowIndex)) {
                classList.push('TopBorder');
            } else if (rowIndex === 8) {
                classList.push('BottomBorder');
            }
            const className = classList.join(' ');
            const value = props.values[rowIndex][colIndex];
            return <td className={className} key={'Col' + colIndex}>
                <SudokuCell value={value} rowNo={rowIndex} columnNo={colIndex} writeToCell={props.handleChange} />
            </td>
        });
        return <tr className="SudokuRow" key={'Row' + rowIndex}>{columns}</tr>;
    });

    return (
        <div className="SudokuBoard">
            <table className="SudokuTable">
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );

};

export default SudokuBoard;