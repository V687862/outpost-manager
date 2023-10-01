import React from 'react';
import PropTypes from 'prop-types';

function ResourceList({ resources }) {
    return (
        <div className="resource-list">
            <h3>Resources:</h3>
            <ul>
                {resources.map((resource, index) => (
                    <li key={index}>
                        {resource.name}
                        {resource.isLinkResource ? ' (Linking Resource)' : ' (Manufacturing Resource)'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

ResourceList.propTypes = {
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            isLinkResource: PropTypes.bool
        })
    ).isRequired
};

export default ResourceList;