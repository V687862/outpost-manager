import {
    ADD_OUTPOST,
    FIND_BEST_COMBO_FOR_BASE,
    FIND_BEST_OUTPOST_COMBINATION,
    GET_OUTPOST_NAME,
    GET_OUTPOST_RESOURCES,
    REMOVE_OUTPOST,
    SET_RESULTS,
    TOGGLE_CONSIDER_LINKING_RESOURCES,
    UPDATE_BEST_COMBO,
    UPDATE_OUTPOST_NAME,
    UPDATE_RESOURCE
} from './actiontypes';
import {findBestLinkedCombo} from "../Utilities/outpostutils";

export const addOutpost = (outpost) => ({
    type: ADD_OUTPOST,
    payload: outpost,
});

export const removeOutpost = (outpostId) => ({
    type: REMOVE_OUTPOST,
    payload: outpostId,
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
export const getOutpostName = (outpostId, outposts) => {
    return (dispatch) => {
        let outpostName = "Unknown";

        const outpost = outposts.find(o => o.id === outpostId);
        if (outpost) {
            outpostName = outpost.name || `Outpost ${outpostId}`;
        }

        dispatch({
            type: GET_OUTPOST_NAME,
            payload: outpostName
        });
    };
};
export const setResults = (results) => ({
    type: SET_RESULTS,
    payload: results,
});
export const getOutpostResources = (outpostId, outposts) => {
    return (dispatch) => {
        const outpost = outposts.find(o => o.id === outpostId);
        const resources = outpost ? outpost.resources : [];

        dispatch({
            type: GET_OUTPOST_RESOURCES,
            payload: resources
        });
    };
};
export const updateBestCombo = (bestCombo, newCombo, outposts, i) => {
    return (dispatch) => {
        const {bestComboGoods} = newCombo;

        if (bestComboGoods > bestCombo.maxGoodsProduced) {
            console.log(`Updated Best Base Outpost to ${outposts[i].id} with max goods of ${bestComboGoods}.`);
            dispatch({
                type: UPDATE_BEST_COMBO,
                payload: {
                    maxGoodsProduced: bestComboGoods,
                    bestBaseOutpost: outposts[i].id,
                    bestLinkedOutposts: newCombo.bestComboOutposts,
                    bestProducedGoods: newCombo.bestComboProducedGoods,
                    bestUnusedResources: newCombo.bestComboUnusedResources
                }
            });
        }
    };
};
export const findBestComboForBase = (i, N, outposts, previousOutposts) => {
    return (dispatch) => {
        if (!outposts || i >= outposts.length || i < 0) {
            console.error('Invalid arguments:', outposts, i);
            return;
        }
        const baseOutpostResources = getOutpostResources(outposts[i].id, outposts);
        let bestComboGoods = 0;
        let bestComboOutposts = [];
        let bestComboProducedGoods = [];
        let bestComboUnusedResources = [];

        console.log(`Finding best combo for base outpost ${i}...`);

        for (let j = 0; j < N; j++) {
            if (i !== j && !previousOutposts.includes(j)) {
                const result = findBestLinkedCombo(i, j, N, baseOutpostResources, [i]);
                if (result.bestComboGoods > bestComboGoods) {
                    bestComboGoods = result.bestComboGoods;
                    bestComboOutposts = result.bestComboOutposts;
                    bestComboProducedGoods = result.bestComboProducedGoods;
                    bestComboUnusedResources = result.bestComboUnusedResources;
                }
            }
        }

        console.log(`Best combo for base outpost ${i}: Goods=${bestComboGoods}, Outposts=${bestComboOutposts.join(', ')}, Produced Goods=${bestComboProducedGoods.join(', ')}, Unused Resources=${bestComboUnusedResources.join(', ')}`);

        dispatch({
            type: FIND_BEST_COMBO_FOR_BASE,
            payload: {bestComboGoods, bestComboOutposts, bestComboProducedGoods, bestComboUnusedResources}
        });
    };
};
export const findBestOutpostCombination = (N, outposts) => {
    return (dispatch) => {
        let bestCombo = {
            maxGoodsProduced: 0,
            bestBaseOutpost: 0,
            bestLinkedOutposts: [],
            bestProducedGoods: [],
            bestUnusedResources: []
        };

        for (let i = 0; i < N; i++) {
            const newCombo = findBestComboForBase(i, N);
            console.log(`For outpost ${i}: Best Combo Goods: ${newCombo.bestComboGoods}, Best Combo Outposts: ${newCombo.bestComboOutposts.join(', ')}, Best Combo Produced Goods: ${newCombo.bestComboProducedGoods.join(', ')}, Best Combo Unused Resources: ${newCombo.bestComboUnusedResources.join(', ')}`);
            bestCombo = updateBestCombo(bestCombo, newCombo, outposts, i);
        }

        dispatch({
            type: FIND_BEST_OUTPOST_COMBINATION,
            payload: {
                bestBaseOutpost: bestCombo.bestBaseOutpost,
                bestLinkedOutposts: bestCombo.bestLinkedOutposts,
                bestProducedGoods: bestCombo.bestProducedGoods,
                bestUnusedResources: bestCombo.bestUnusedResources
            }
        });
    };
};

