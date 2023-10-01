import {ADD_OUTPOST, REMOVE_OUTPOST, TOGGLE_LINKING_RESOURCES} from "../actiontypes";

const initialState = {
    outposts: [],
    considerLinkingResources: false,
};
const outpostReducer = (state = initialState.outposts, action) => {
    switch (action.type) {
        case ADD_OUTPOST:
            // Handle adding an outpost to the state
            return {
                ...state,
                outposts: [...state.outposts, action.payload],
            };
        case REMOVE_OUTPOST:
            // Handle removing an outpost from the state
            return {
                ...state,
                outposts: state.outposts.filter((o) => o.id !== action.payload),
            };
        case TOGGLE_LINKING_RESOURCES:
            // Handle toggling linking resources
            return {
                ...state,
                considerLinkingResources: !state.considerLinkingResources,
            };
        // ...other cases for different actions
        default:
            return state;
    }
};
export default outpostReducer;