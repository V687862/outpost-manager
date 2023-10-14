import React from 'react';
import PropTypes from 'prop-types';

function Results({ results }) {
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