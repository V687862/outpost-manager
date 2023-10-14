import React, { createContext, useContext, useState } from 'react';

const ResourceToggleContext = createContext();

export const UseResourceToggle = () => {
    return useContext(ResourceToggleContext);
};

export const ResourceToggleProvider = ({ children }) => {
    const [considerLinking, setConsiderLinking] = useState(false);

    return (
        <ResourceToggleContext.Provider value={{ considerLinking, setConsiderLinking }}>
            {children}
        </ResourceToggleContext.Provider>
    );
};
