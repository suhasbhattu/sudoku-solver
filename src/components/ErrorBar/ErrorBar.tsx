import React from 'react';
import './ErrorBar.css';

interface ErrorBarProps {
    message: string
}

const ErrorBar = (props: ErrorBarProps) => {
    return (
        <div className="ErrorBar">
            <span className="ErrorMessage">{props.message}</span>
        </div>
    );
};

export default ErrorBar;