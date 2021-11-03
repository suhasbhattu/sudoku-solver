import React from 'react';
import './SudokuCell.css';

interface SudokuCellProps {
    value: string;
    rowNo: number;
    columnNo: number;
    writeToCell: Function;
}

const SudokuCell = (props: SudokuCellProps) => {

    const changeInput = (event: any) => {
        const inputValue: string = event.target.value.slice(-1);
        if (Number(inputValue) > 0 && Number(inputValue) < 10) {
            props.writeToCell(props.rowNo, props.columnNo, inputValue);
        } else if (inputValue === '') {
            props.writeToCell(props.rowNo, props.columnNo, '');
        }
    };

    return (
        <input className="SudokuCellInput" type="text" value={props.value} onChange={changeInput} />
    );

};

export default SudokuCell;