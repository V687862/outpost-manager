import React from 'react';
import { UseResourceToggle } from './resourcetogglecontext';

const ResourceToggle = () => {
    const { considerLinkingResources, setConsiderLinkingResources } = UseResourceToggle();

    return (
        <div>
            <label>
                Consider Linking Resources
                <input
                    type="checkbox"
                    checked={considerLinkingResources}
                    onChange={() => setConsiderLinkingResources(!considerLinkingResources)}
                />
            </label>
        </div>
    );
};

export default ResourceToggle;
