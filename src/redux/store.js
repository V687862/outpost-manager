import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import outpostReducer from "./reducers/outpostReducer";
import resourceReducer from "./reducers/resourceReducer";


const rootReducer = combineReducers({
    outposts: outpostReducer,
    resources: resourceReducer,
    // ...other reducers for additional state properties
});

// Create the Redux store
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
