import React from 'react';
import { UseResourceToggle } from './resourcetogglecontext';
import PropTypes from 'prop-types';

const Outpost = ({ id, name, resources, onResourceChange, onNameChange, onRemove }) => {
    const { considerLinking } = UseResourceToggle();
    const filteredResources = resources.filter(resource => resource.isLinkResource === considerLinking);

    return (
        <div className="outpost">
            <h2>{name || `Outpost ${id}`}</h2>
            <label>Name: </label>
            <input
                type="text"
                value={name}
                placeholder={`Outpost ${id} Name`}
                onChange={(e) => onNameChange(id, e.target.value)}
            />

            <h3>Resources:</h3>
            {filteredResources.map((resource, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`${resource.name}-outpost${id}`}
                        onChange={(e) => onResourceChange(id, resource.name, e.target.checked)}
                    />
                    <label htmlFor={`${resource.name}-outpost${id}`}>{resource.name}</label>
                </div>
            ))}

            {id !== 1 && <button onClick={() => onRemove(id)}>Remove Outpost</button>}
        </div>
    );
};

Outpost.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            isLinkResource: PropTypes.bool
        })
    ).isRequired,
    onResourceChange: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

Outpost.defaultProps = {
    name: '',
};

export default Outpost;
