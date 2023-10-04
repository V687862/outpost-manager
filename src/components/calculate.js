import React from 'react';

const Calculate = ({onCalculate}) => {
    return (
        <button onClick={onCalculate}>
            Calculate
        </button>
    );
};

export default Calculate;