import {combineReducers, createStore} from 'redux';
import outpostReducer from "./reducers/outpostReducer";
import resourceReducer from "./reducers/resourceReducer";


const rootReducer = combineReducers({
    outposts: outpostReducer,
    resources: resourceReducer,
    // ...other reducers for additional state properties
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
