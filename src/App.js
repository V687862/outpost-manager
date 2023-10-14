import React, { useState } from 'react';
import Outpost from './components/outpost';
import ResourceToggle from './components/resourcetoggle';
import Controls from './components/controls';
import Results from './components/results';
import { addOutpost, removeOutpost, calculate } from './Utilities/outpostutils';

function App() {
    const [outposts, setOutposts] = useState([]);
    const [results, setResults] = useState([]);
    const [considerLinkingResources] = useState(false);  // prefixed with underscore

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

    const toggleConsiderLinkingResources = () => {
        setConsiderLinkingResources(prev => !prev);
    };

    return (
        <div className="App">
            <Controls
                onAddOutpost={() => addOutpost(outposts, setOutposts)}
                onCalculate={() => calculate(outposts, considerLinkingResources, setResults)}
            />
            <ResourceToggle toggleConsiderLinkingResources={toggleConsiderLinkingResources} />
            {outposts.map(outpost => (
                <Outpost
                    key={outpost.id}
                    id={outpost.id}
                    name={outpost.name}
                    onResourceChange={handleResourceChange}
                    onNameChange={handleNameChange}
                    onRemove={() => removeOutpost(outpost.id, outposts, setOutposts)}
                    considerLinkingResources={considerLinkingResources}
                    resources={''}/>
            ))}
            <Results results={results} />
        </div>
    );
}

export default App;