import React from 'react';
import PropTypes from 'prop-types';
import resources from '../data/resourcesdata';

function ResourceToggle({outpostId, onResourceChange, considerLinkingResources}) {
    // Divide resources into linking and manufacturing
    const resourcesKeys = Object.keys(resources).filter(key => resources[key].isLinkResource);
    const manufacturingResourcesKeys = Object.keys(resources).filter(key => !resources[key].isLinkResource);

    return (
        <div className="resource-toggle">
            <h3>Manufacturing Resources:</h3>
            {manufacturingResourcesKeys.map(resourceKey => (
                <div key={resourceKey}>
                    <input
                        type="checkbox"
                        id={`${resourceKey}-outpost${outpostId}`}
                        onChange={(e) => onResourceChange(outpostId, resourceKey, e.target.checked)}
                    />
                    <label htmlFor={`${resourceKey}-outpost${outpostId}`}>{resources[resourceKey].name}</label>
                </div>
            ))}

            {considerLinkingResources && (
                <>
                    <h3>Resources:</h3>
                    {resourcesKeys.map(resourceKey => (
                        <div key={resourceKey}>
                            <input
                                type="checkbox"
                                id={`${resourceKey}-outpost${outpostId}-linking`}
                                onChange={(e) => onResourceChange(outpostId, resourceKey, e.target.checked)}
                            />
                            <label htmlFor={`${resourceKey}-outpost${outpostId}-linking`}>{resources[resourceKey].name}</label>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

ResourceToggle.propTypes = {
    outpostId: PropTypes.number.isRequired,
    onResourceChange: PropTypes.func.isRequired,
    considerLinkingResources: PropTypes.bool,
};

ResourceToggle.defaultProps = {
    considerLinkingResources: false,
};

export default ResourceToggle;