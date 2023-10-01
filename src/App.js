import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addOutpost, removeOutpost, updateOutpostName, updateResource} from './redux/actions'; // Import your Redux actions
import Outpost from './components/outpost';
import ResourceToggle from './components/resourcetoggle';
import ResourceList from './components/resourcelist';
import Controls from './components/controls';
import Results from './components/results';
import resourcesdata from "./data/resourcesdata";
import {calculate} from "./Utilities/outpostutils";

function App() {
    const outposts = useSelector((state) => state.outposts);
    const considerLinkingResources = useSelector((state) => state.considerLinkingResources);
    const dispatch = useDispatch();
    const [results, setResults] = useState([]);

    const yourResourcesArray = Object.keys(resourcesdata).map(key => ({
        id: key,
        name: resourcesdata[key].name,
    }));
    const handleResourceChange = (outpostId, resourceName, isChecked) => {
        dispatch(updateResource(outpostId, resourceName, isChecked));
    };
    const handleCalculate = () => {
        // Check if outposts is not empty
        if (outposts.length === 0) {
            alert("No outposts available for calculation.");
            return;
        }

        // Check if each outpost object has an 'id' property
        for (let i = 0; i < outposts.length; i++) {
            if (!outposts[i].hasOwnProperty('id')) {
                alert(`Outpost at index ${i} does not have an 'id' property.`);
                return;
            }
        }

        // If validations pass, proceed with calculation
        calculate(outposts, considerLinkingResources, setResults);
    };
    const handleNameChange = (outpostId, newName) => {
        dispatch(updateOutpostName(outpostId, newName)); // Dispatch the action
    };


    return (
        <div className="App">
            <Controls
                onAddOutpost={() => addOutpost(outposts, setOutposts)}
                onCalculate={handleCalculate}
            />
            <label>
                <input
                    type="checkbox"
                    checked={considerLinkingResources}
                    onChange={() => setConsiderLinkingResources(prev => !prev)}
                />
                Consider Linking Resources
            </label>
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
                        resources={yourResourcesArray}
                        onResourceChange={(resourceName, isChecked) => handleResourceChange(outpost.id, resourceName, isChecked)}  // added onResourceChange prop
                    />
                </Outpost>
            ))}
            <Results results={results}/> {/* updated prop name to results */}
            {/* Optional: Render the ResourceList component if you have a use for it */}
            <ResourceList resources={[]}/> {/* assuming resources is an array */}
        </div>
    );
}

export default App;