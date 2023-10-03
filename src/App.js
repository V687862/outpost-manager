import React, {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {addOutpost, removeOutpost, toggleConsiderLinkingResources} from './redux/actions'; // Import your Redux actions
import Outpost from './components/outpost';
import ResourceToggle from './components/resourcetoggle';
import Controls from './components/controls';
import Results from './components/results';
import resourcesdata from "./data/resourcesdata";
import store from './redux/store';
import Calculate from "./components/calculate";

function App() {
    const outposts = useSelector((state) => state.outposts);
    const considerLinkingResources = useSelector((state) => state.considerLinkingResources);
    const dispatch = useDispatch();
    const [results, setResults] = useState([]);
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
                <Calculate
                    onCalculate={} results={}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={considerLinkingResources}
                        onChange={() => dispatch(toggleConsiderLinkingResources())}
                    />
                    Consider Linking Resources
                </label>
                {outposts.map(outpost => (
                    <Outpost
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
                    </Outpost>
                ))}
                <Results results={results}/>
            </div>
        </Provider>
    );
}
export default App;