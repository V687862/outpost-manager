import {
    ADD_OUTPOST,
    FIND_BEST_OUTPOST_COMBINATION,
    GET_OUTPOST_NAME,
    GET_OUTPOST_RESOURCES,
    REMOVE_OUTPOST,
    TOGGLE_LINKING_RESOURCES
} from "../actiontypes";

const initialState = {
    outposts: [],
    considerLinkingResources: false,
    outpostResources: [],
    outpostName: "",
    bestComboGoods: 0,
    bestComboOutposts: [],
    bestComboProducedGoods: [],
    bestComboUnusedResources: []
};
const outpostReducer = (state = initialState, action) => {
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
        case GET_OUTPOST_NAME:
            return {
                ...state,
                outpostName: action.payload
            };
        case GET_OUTPOST_RESOURCES:
            return {
                ...state,
                outpostResources: action.payload
            };
        case FIND_BEST_OUTPOST_COMBINATION:
            return {
                ...state,
                bestBaseOutpost: action.payload.bestBaseOutpost,
                bestLinkedOutposts: action.payload.bestLinkedOutposts,
                bestProducedGoods: action.payload.bestProducedGoods,
                bestUnusedResources: action.payload.bestUnusedResources
            };

        // ...other cases for different actions
        default:
            return state;
    }
};
export default outpostReducer;