import React from 'react';
import PropTypes from 'prop-types';

function Controls({onAddOutpost, onRemoveOutpost}) {
    return (
        <div className="controls">
            <button onClick={onAddOutpost}>Add Outpost</button>
            <button onClick={onRemoveOutpost}>Remove Outpost</button>
        </div>
    );
}

Controls.propTypes = {
    onAddOutpost: PropTypes.func.isRequired,
    onRemoveOutpost: PropTypes.func.isRequired
};

export default Controls;