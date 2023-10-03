import React from 'react';
import Results from '../components/results';
import PropTypes from "prop-types"; // Importing the Results component

const Calculate = ({onCalculate, results}) => {
    return (
        <div>
            <button onClick={handleCalculate}>Calculate</button>
            <Results results={results}/>
        </div>
    );
};

Calculate.propTypes = {
    onCalculate: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired  // Adjust the type according to your data structure
};

export default Calculate;