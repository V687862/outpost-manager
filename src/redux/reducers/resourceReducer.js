import {
    CAN_PRODUCE_GOOD,
    TOGGLE_CONSIDER_LINKING_RESOURCES,
    UPDATE_OUTPOST_NAME,
    UPDATE_RESOURCE
} from '../actiontypes';

const initialState = {
    // ... your other initial state properties
    outposts: [],
    canProduceGood: false,
};

const resourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_RESOURCE: {
            const {outpostId, resourceName, isChecked} = action.payload;

            // Update the outposts state based on the action payload
            const updatedResources = state.outposts.map((outpost) => {
                if (outpost.id === outpostId) {
                    const updatedResources = isChecked
                        ? [...outpost.resources, resourceName]
                        : outpost.resources.filter((resource) => resource !== resourceName);

                    return {...outpost, resources: updatedResources};
                }
                return outpost;
            });

            return {
                ...state,
                outposts: updatedResources,
            };
        }

        case UPDATE_OUTPOST_NAME: {
            const {outpostId, newName} = action.payload;

            // Update the outposts state based on the action payload
            const updatedNames = state.outposts.map((outpost) => {
                if (outpost.id === outpostId) {
                    return {...outpost, name: newName};
                }
                return outpost;
            });

            return {
                ...state,
                outposts: updatedNames,
            };
        }
        case TOGGLE_CONSIDER_LINKING_RESOURCES:
            return {
                ...state,
                considerLinkingResources: !state.considerLinkingResources,
            };
        case CAN_PRODUCE_GOOD:
            return {
                ...state,
                canProduceGood: action.payload,
            };
        default:
            return state;
    }
};

export default resourceReducer;
