import React, { useState } from 'react';
import Outpost from './components/outpost';
import ResourceToggle from './components/resourcetoggle';
import ResourceList from './components/resourcelist';
import Controls from './components/controls';
import Results from './components/results';
import { addOutpost, removeOutpost, calculate } from './Utilities/outpostutils';
import resourcesdata from "./data/resourcesdata";

function App() {
    const [outposts, setOutposts] = useState([]);
    const [results, setResults] = useState([]);
    const [considerLinkingResources, _setConsiderLinkingResources] = useState(false);  // prefixed with underscore

    const handleResourceChange = (outpostId, resourceName, isChecked) => {
        setOutposts(prev => prev.map(outpost => {
            if (outpost.id === outpostId) {
                const updatedResources = isChecked ?
                    [...outpost.resources, resourceName] :
                    outpost.resources.filter(resource => resource !== resourceName);
                return { ...outpost, resources: updatedResources };
            }
            return outpost;
        }));
    };

    const handleNameChange = (outpostId, newName) => {
        setOutposts(prev => prev.map(outpost => {
            if (outpost.id === outpostId) {
                return { ...outpost, name: newName };
            }
            return outpost;
        }));
    };

    return (
        <div className="App">
            <Controls
                onAddOutpost={() => addOutpost(outposts, setOutposts)}
                onCalculate={() => calculate(outposts, considerLinkingResources, setResults)}
            />
            {outposts.map(outpost => (
                <Outpost
                    key={outpost.id}
                    id={outpost.id}
                    name={outpost.name}
                    onResourceChange={handleResourceChange}
                    onNameChange={handleNameChange}
                    onRemove={() => removeOutpost(outpost.id, outposts, setOutposts)}
                    considerLinkingResources={considerLinkingResources}
                >
                    {/* Embed the ResourceToggle component within each Outpost component */}
                    <ResourceToggle
                        outpostId={outpost.id}  // added outpostId prop
                        onResourceChange={(resourceName, isChecked) => handleResourceChange(outpost.id, resourceName, isChecked)}  // added onResourceChange prop
                    />
                </Outpost>
            ))}
            <Results results={results} />  {/* updated prop name to results */}
            {/* Optional: Render the ResourceList component if you have a use for it */}
            <ResourceList resources={{}} />  {/* assuming resources is an object */}
        </div>
    );
}

export default App;