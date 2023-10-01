import React from 'react';
import resources from '../data/resourcesdata';
import PropTypes from "prop-types";

function Outpost({ id, name, onResourceChange, onNameChange, considerLinkingResources,onRemove }) {
    // Divide resources into linking and manufacturing
    const resourcesKeys = Object.keys(resources).filter(key => resources[key].isLinkResource);
    const manufacturingResourcesKeys = Object.keys(resources).filter(key => !resources[key].isLinkResource);

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

            <h3>Manufacturing Resources:</h3>
            {manufacturingResourcesKeys.map(resourceKey => (
                <div key={resourceKey}>
                    <input
                        type="checkbox"
                        id={`${resourceKey}-outpost${id}`}
                        onChange={(e) => onResourceChange(id, resourceKey, e.target.checked)}
                    />
                    <label htmlFor={`${resourceKey}-outpost${id}`}>{resources[resourceKey].name}</label>
                </div>
            ))}

            {considerLinkingResources && (
                <>
                    <h3>Resources:</h3>
                    {resourcesKeys.map(resourceKey => (
                        <div key={resourceKey}>
                            <input
                                type="checkbox"
                                id={`${resourceKey}-outpost${id}`}
                                onChange={(e) => onResourceChange(id, resourceKey, e.target.checked)}
                                value={resourceKey}
                            />
                            <label htmlFor={`${resourceKey}-outpost${id}-linking`}>{resources[resourceKey].name}</label>
                        </div>
                    ))}
                </>
            )}
            {/* Conditionally render the remove button based on whether it's the first outpost */}
            {id !== 1 && <button onClick={() => onRemove(id)}>Remove Outpost</button>}
        </div>
    );
}
Outpost.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    onResourceChange: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    considerLinkingResources: PropTypes.bool,
    onRemove: PropTypes.func.isRequired,
};
Outpost.defaultProps = {
    name: '',
    considerLinkingResources: false,
};
export default Outpost;

