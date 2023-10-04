import React, {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
    addOutpost,
    removeOutpost,
    toggleConsiderLinkingResources,
    updateOutpostName,
    updateOutpostResource
} from './redux/actions'; // Import your Redux actions
import ResourceToggle from './components/resourcetoggle';
import Controls from './components/controls';
import Results from './components/results';
import resourcesdata from "./data/resourcesdata";
import store from './redux/store';
import CalculateContainer from "./containers/calculateContainer";
import OutpostContainer from "./containers/outpostContainer";

function App() {
    const outposts = useSelector((state) => state.outposts);
    const considerLinkingResources = useSelector((state) => state.considerLinkingResources);
    const dispatch = useDispatch();
    const [results] = useState([]);
    const handleNameChange = (outpostId, newName) => {
        dispatch(updateOutpostName(outpostId, newName));
    };

    const handleResourceChange = (outpostId, resourceId, newValue) => {
        dispatch(updateOutpostResource(outpostId, resourceId, newValue));
    };

    const yourResourcesArray = Object.keys(resourcesdata).map(key => ({
        id: key,
        name: resourcesdata[key].name,
    }));


    return (
        <Provider store={store}>
            <div className="App">
                <Controls
                    onAddOutpost={() => dispatch(addOutpost())}

                />
                <CalculateContainer/>
                <label>
                    <input
                        type="checkbox"
                        checked={considerLinkingResources}
                        onChange={() => dispatch(toggleConsiderLinkingResources())}
                    />
                    Consider Linking Resources
                </label>
                {outposts.map(outpost => (
                    <OutpostContainer
                        key={outpost.id}
                        id={outpost.id}
                        name={outpost.name}
                        onNameChange={handleNameChange}
                        onRemove={() => dispatch(removeOutpost(outpost.id))}
                        considerLinkingResources={considerLinkingResources}
                        onResourceChange={() => {
                        }}>
                        <ResourceToggle
                            outpostId={outpost.id}
                            resources={yourResourcesArray}
                            onResourceChange={handleResourceChange}/>
                    </OutpostContainer>
                ))}
                <Results results={results}/>
            </div>
        </Provider>
    );
}
export default App;