import {combineReducers, createStore} from 'redux';
import outpostReducer from "./reducers/outpostReducer";
import resourceReducer from "./reducers/resourceReducer";

// Define an initial state
const initialState = {
    outposts: [], // Your outposts state
    considerLinkingResources: false,
    // ...other states you may have
};

const rootReducer = combineReducers({
    outposts: outpostReducer,
    resources: resourceReducer,
    // ...other reducers for additional state properties
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
