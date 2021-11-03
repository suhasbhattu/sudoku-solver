import React, { MouseEventHandler } from 'react';
import './ButtonPanel.css';

interface ButtonPanelProps {
    resetBoard: MouseEventHandler,
    solveSudoku: MouseEventHandler
}

const ButtonPanel = (props: ButtonPanelProps) => {

    return (
        <div className="ButtonPanel">
            <button className="SudokuButton" onClick={props.solveSudoku}>
                <span className="ButtonText">Solve</span>
            </button>
            <button className="SudokuButton" onClick={props.resetBoard}>
                <span className="ButtonText">Reset</span>
            </button>
        </div>
    );

};

export default ButtonPanel;