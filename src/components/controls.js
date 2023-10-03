import React from 'react';
import PropTypes from 'prop-types';

function Controls({ onAddOutpost, onCalculate }) {
    return (
        <div className="controls">
            <button onClick={onAddOutpost}>Add Outpost</button>
        </div>
    );
}

Controls.propTypes = {
    onAddOutpost: PropTypes.func.isRequired,
};

export default Controls;