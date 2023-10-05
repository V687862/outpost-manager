import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addOutpost,
    removeOutpost,
    toggleConsiderLinkingResources,
    updateOutpostName,
    updateOutpostResource
} from './redux/actions'; // Import your Redux actions
import ResourceToggle from './components/resourcetoggle';
import Controls from './components/controls';
import CalculateContainer from "./containers/calculateContainer";
import OutpostContainer from "./containers/outpostContainer";
import FinalResultComponent from "./components/finalResults";
import OutpostResultComponent from "./components/outpostResults";

function App() {
    const outposts = useSelector((state) => state.outpost?.outposts || []);


    const considerLinkingResources = useSelector((state) => state.considerLinkingResources);
    const dispatch = useDispatch();
    const handleNameChange = (outpostId, newName) => {
        dispatch(updateOutpostName(outpostId, newName));
    };

    const handleResourceChange = (outpostId, resourceId, newValue) => {
        dispatch(updateOutpostResource(outpostId, resourceId, newValue));
    };




    return (
        <div className="App">
                <Controls
                    onAddOutpost={() => dispatch(addOutpost())}

                    onRemoveOutpost={() => dispatch(removeOutpost())}/>
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
                            onResourceChange={handleResourceChange}
                        />
                    </OutpostContainer>
                ))}
                <OutpostResultComponent></OutpostResultComponent>
                <FinalResultComponent>
                </FinalResultComponent>
            </div>

    );
}
export default App;