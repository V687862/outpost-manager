import React from 'react';
import { UseResourceToggle } from './resourcetogglecontext';
import PropTypes from 'prop-types';

const ResourceList = ({ resources }) => {
    const { considerLinking } = UseResourceToggle();
    const filteredResources = resources.filter(resource => resource.isLinkResource === considerLinking);

    return (
        <div className="resource-list">
            <h3>Resources:</h3>
            <ul>
                {filteredResources.map((resource, index) => (
                    <li key={index}>
                        {resource.name}
                        {resource.isLinkResource ? ' (Linking Resource)' : ' (Manufacturing Resource)'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ResourceList.propTypes = {
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            isLinkResource: PropTypes.bool
        })
    ).isRequired
};

export default ResourceList;