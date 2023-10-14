import React, { createContext, useContext, useState } from 'react';

const ResourceToggleContext = createContext();

export const UseResourceToggle = () => {
    return useContext(ResourceToggleContext);
};

export const ResourceToggleProvider = ({ children }) => {
    const [considerLinkingResources, setConsiderLinkingResources] = useState(false);

    return (
        <ResourceToggleContext.Provider value={{ considerLinkingResources, setConsiderLinkingResources }}>
            {children}
        </ResourceToggleContext.Provider>
    );
};
