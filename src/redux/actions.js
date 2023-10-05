import {
    ADD_OUTPOST,
    CAN_PRODUCE_GOOD,
    FIND_BEST_COMBO_FOR_BASE,
    FIND_BEST_LINKED_COMBO,
    FIND_BEST_OUTPOST_COMBINATION,
    GET_OUTPOST_NAME,
    GET_OUTPOST_RESOURCES,
    GET_PRODUCABLE_GOODS,
    GET_UNUSED_RESOURCES,
    REMOVE_OUTPOST,
    SET_ERROR,
    SET_LOADING,
    SET_OUTPOSTS,
    SET_RESULTS,
    TOGGLE_CONSIDER_LINKING_RESOURCES,
    UPDATE_BEST_COMBO,
    UPDATE_OUTPOST_NAME,
    UPDATE_OUTPOST_RESOURCE
} from './actiontypes';
import {memo} from "react";
import resources from "../data/resourcesdata";
import goods from "../data/goodsdata";

export const addOutpost = (outpost) => ({
    type: ADD_OUTPOST,
    payload: outpost,
});

export const removeOutpost = (outpostId) => ({
    type: REMOVE_OUTPOST,
    payload: outpostId,
});
export const updateOutpostName = (outpostId, newName) => {
    return {
        type: UPDATE_OUTPOST_NAME,
        payload: {outpostId, newName},
    };
};
export const setOutposts = (outposts) => ({
    type: SET_OUTPOSTS,
    payload: outposts,
});
export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});
export const toggleConsiderLinkingResources = () => ({
    type: TOGGLE_CONSIDER_LINKING_RESOURCES,
});
export const canProduceGood = (outpostResources, good, considerLinkingResources) => {
    return (dispatch) => {
        const canProduce = good.resources.every(resourceOrGood => {
            const isResource = resources[resourceOrGood.name];
            const isGood = goods[resourceOrGood.name];

            if (isResource) {
                return (considerLinkingResources || !resourceOrGood.isLinkResource) && outpostResources.includes(resourceOrGood.name);
            } else if (isGood) {
                return canProduceGood(outpostResources, goods[resourceOrGood.name]);
            } else {
                return false;  // or handle this case as appropriate for your logic
            }
        });

        dispatch({
            type: CAN_PRODUCE_GOOD,
            payload: canProduce
        });
    };
};
export const getProducableGoods = (outpostResources) => {
    return (dispatch) => {
        const producableGoods = Object.values(goods).filter(good => canProduceGood(outpostResources, good));
        dispatch({
            type: GET_PRODUCABLE_GOODS,
            payload: producableGoods
        });
    };
};

export const unusedResources = (outpostResources, producedGoods) => {
    return (dispatch) => {
        const unusedResources = outpostResources.filter(res => !producedGoods.some(good => good.resources.some(r => r.name === res)));
        dispatch({
            type: GET_UNUSED_RESOURCES,
            payload: unusedResources
        });
    };
};



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
export const updateOutpostResource = (outpostId, resourceId, newValue) => ({
    type: UPDATE_OUTPOST_RESOURCE,
    payload: {
        outpostId,
        resourceId,
        newValue
    }
});
export const updateBestCombo = (bestCombo, newCombo, outposts, i) => {
    return (dispatch) => {
        const {bestComboGoods} = newCombo;

        if (bestComboGoods > bestCombo.maxGoodsProduced) {
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
export const findBestComboForBase = (i, N, outposts) => {
    return async (dispatch) => {
        if (!outposts || i >= outposts.length || i < 0) {
            console.error('Invalid arguments:', outposts, i);
            return;
        }

        // Assuming getOutpostResources is a selector or utility function that retrieves resources
        const baseOutpostResources = getOutpostResources(outposts[i].id, outposts);
        let bestComboGoods = 0;
        let bestComboOutposts = [];
        let bestComboProducedGoods = [];
        let bestComboUnusedResources = [];

        for (let j = 0; j < N; j++) {
            if (i !== j) {
                // Dispatching findBestLinkedCombo as an action
                const result = await dispatch(findBestLinkedCombo(i, j, N, baseOutpostResources, [i]));
                if (result.bestComboGoods > bestComboGoods) {
                    bestComboGoods = result.bestComboGoods;
                    bestComboOutposts = result.bestComboOutposts;
                    bestComboProducedGoods = result.bestComboProducedGoods;
                    bestComboUnusedResources = result.bestComboUnusedResources;
                }
            }
        }
        dispatch({
            type: FIND_BEST_COMBO_FOR_BASE,
            payload: {bestComboGoods, bestComboOutposts, bestComboProducedGoods, bestComboUnusedResources}
        });
    };
};
export const findBestOutpostCombination = (N, outposts) => {
    return async (dispatch) => {
        let bestCombo = {
            maxGoodsProduced: 0,
            bestBaseOutpost: 0,
            bestLinkedOutposts: [],
            bestProducedGoods: [],
            bestUnusedResources: []
        };

        for (let i = 0; i < N; i++) {
            const newCombo = await dispatch(findBestComboForBase(i, N, outposts));

            // Dispatching updateBestCombo as an action
            bestCombo = await dispatch(updateBestCombo(bestCombo, newCombo, outposts, i));
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

export const findBestLinkedCombo = (i, j, N, outposts, previousResources, previousOutposts) => {
    return (dispatch) => {
        // Your existing function logic here...
        const memoKey = `${i}-${j}-${previousOutposts.join('-')}`;

        if (memo[memoKey]) {
            return memo[memoKey];
        }

        const producableGoods = getProducableGoods(previousResources);
        let comboResources = unusedResources(previousResources, getProducableGoods(previousResources));


        let bestComboGoods = producableGoods;
        let bestComboOutposts = [outposts[j].id];
        let bestComboProducedGoods = [producableGoods];
        let bestComboUnusedResources = comboResources;

        for (let k = j + 1; k < N; k++) {
            if (k !== i && !previousOutposts.includes(k)) {
                const result = findBestLinkedCombo(i, k, N, comboResources, [...previousOutposts, j]);
                if (result.bestComboGoods > bestComboGoods) {
                    bestComboGoods = result.bestComboGoods;
                    bestComboOutposts = [outposts[k].id, ...result.bestComboOutposts];
                    bestComboProducedGoods = [producableGoods, ...result.bestComboProducedGoods];
                    bestComboUnusedResources = result.bestComboUnusedResources;
                }
            }
        }

        console.log(`Best linked combo for base outpost ${i} and linked outpost ${j}: Goods=${bestComboGoods}, Outposts=${bestComboOutposts.join(', ')}, Produced Goods=${bestComboProducedGoods.join(', ')}, Unused Resources=${bestComboUnusedResources.join(', ')}`);

        memo[memoKey] = {bestComboGoods, bestComboOutposts, bestComboProducedGoods, bestComboUnusedResources};

        // Dispatch the action with the calculated values
        dispatch({
            type: FIND_BEST_LINKED_COMBO,
            payload: {
                bestComboGoods,
                bestComboOutposts,
                bestComboProducedGoods,
                bestComboUnusedResources,
            }
        });

        return {bestComboGoods, bestComboOutposts, bestComboProducedGoods, bestComboUnusedResources};
    };
};
export const calculate = (outposts, considerLinkingResources) => {
    return async (dispatch) => {
        try {
            if (!Array.isArray(outposts) || typeof considerLinkingResources !== 'boolean') {
                throw new Error('Invalid parameters passed to calculate action');
            }
            const {
                bestBaseOutpost,
                bestLinkedOutposts,
                bestProducedGoods,
                bestUnusedResources
            } = await findBestOutpostCombination(outposts.length);

            // Dispatch results to Redux state
            dispatch(setResults({
                bestBaseOutpost,
                bestLinkedOutposts,
                bestProducedGoods,
                bestUnusedResources,
                considerLinkingResources,
            }));
        } catch (error) {
            dispatch(setError(error.toString()));//... error handling
        } finally {
            dispatch(setLoading(false));
        }
    };
};



