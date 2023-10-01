import {UPDATE_OUTPOST_NAME, UPDATE_RESOURCE} from './actiontypes';

export const addOutpost = (outpost) => ({
    type: 'ADD_OUTPOST',
    payload: outpost,
});

export const removeOutpost = (outpostId) => ({
    type: 'REMOVE_OUTPOST',
    payload: outpostId,
});

export const toggleLinkingResources = () => ({
    type: 'TOGGLE_LINKING_RESOURCES',
});
export const updateResource = (outpostId, resourceName, isChecked) => {
    return {
        type: UPDATE_RESOURCE,
        payload: {outpostId, resourceName, isChecked},
    };
};
export const updateOutpostName = (outpostId, newName) => {
    return {
        type: UPDATE_OUTPOST_NAME,
        payload: {outpostId, newName},
    };
};
export const toggleConsiderLinkingResources = () => ({
    type: TOGGLE_CONSIDER_LINKING_RESOURCES,
});
