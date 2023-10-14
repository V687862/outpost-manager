import React from 'react';
import PropTypes from 'prop-types';

function Controls({ onAddOutpost, onCalculate }) {
    return (
        <div className="controls">
            <button onClick={onAddOutpost}>Add Outpost</button>
            <button onClick={onCalculate}>Calculate</button>
        </div>
    );
}

Controls.propTypes = {
    onAddOutpost: PropTypes.func.isRequired,
    onCalculate: PropTypes.func.isRequired,
};

export default Controls;