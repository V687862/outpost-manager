import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

const Results = () => {
    const results = useSelector(state => state.results);
    return (
        <div className="results">
            <h2>Results</h2>
            {results.length > 0 ? (
                results.map((result, index) => (
                    <div key={index} className="result">
                        {result}
                    </div>
                ))
            ) : (
                <p>No results to display.</p>
            )}
        </div>
    );
}

Results.propTypes = {
    results: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Results;