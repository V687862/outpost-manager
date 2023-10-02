import goods from "../data/goodsdata";
import {canProduceGood, formatGoodNames, formatResourceList} from "./resourceutils";
import {findBestComboForBase, findBestOutpostCombination, setResults} from "../redux/actions";

function getOutpostName(outpostId, outposts) {
    if (outpostId <= 0 || outpostId > outposts.length) return "Unknown";
    const outpost = outposts[outpostId - 1];
    return outpost ? (outpost.name || `Outpost ${outpostId}`) : "Unknown";
}

export const calculateThunk = (outposts, considerLinkingResources) => {
    return (dispatch, getState) => {
        const N = outposts.length;
        const {
            bestBaseOutpost,
            bestLinkedOutposts,
            bestProducedGoods,
            bestUnusedResources
        } = findBestOutpostCombination(N);

        const newResults = outposts.map(outpost => formatOutpostResult(outpost));

        const finalResult = formatFinalResult(
            bestBaseOutpost,
            bestLinkedOutposts,
            bestProducedGoods,
            bestUnusedResources,
            considerLinkingResources
        );

        // Dispatching the synchronous action to update the state
        dispatch(setResults([...newResults, ...finalResult]));
    };
};

function getBestComboForBase(i, N) {
    return findBestComboForBase(i, N, []);
}

// Function to update the best combo if the new combo is better
function formatOutpostResult(outpost) {
    const outpostResources = outpost.resources;
    const manufacturableGoods = Object.values(goods).filter(good => canProduceGood(outpostResources, good));

    return manufacturableGoods.length
        ? `<h3>${getOutpostName(outpost.id)}</h3>Can manufacture: ${formatGoodNames(manufacturableGoods)}`
        : `<h3>${getOutpostName(outpost.id)}</h3>Cannot manufacture any goods with current resources.`;
}

function formatFinalResult(outposts, bestBaseOutpost, bestLinkedOutposts, bestProducedGoods, bestUnusedResources, considerLinkingResources) {
    const results = [];

    function formatGoodNames(goodList) {
        return goodList.map(good => good.name).join(", ");
    }

    function getOutpostName(outpostID, outposts) {
        const outpost = outposts.find(o => o.id === outpostID);
        return outpost ? outpost.name : "Unknown";
    }

    results.push(`The best primary outpost to get the maximum number of goods is: ${getOutpostName(bestBaseOutpost)}.`);
    results.push(`Goods Produced at ${getOutpostName(bestBaseOutpost)}: ${formatGoodNames(bestProducedGoods)}.`);

    if (considerLinkingResources) {
        results.push(`Unused resources at ${getOutpostName(bestBaseOutpost)}: ${bestUnusedResources.join(", ")}`);
    }

    if (bestLinkedOutposts.length > 0) {
        const linkedNames = bestLinkedOutposts.map(getOutpostName).join(', ');
        results.push(`Linked Outposts to ${getOutpostName(bestBaseOutpost)}: ${linkedNames}.`);

        bestLinkedOutposts.forEach(outpostID => {
            const outpost = outposts.find(o => o.id === outpostID);
            results.push(`${getOutpostName(outpostID)} provides the following resources:\n${formatResourceList(outpost, considerLinkingResources)}`);
        });
    }

    return results;
}

export {
    getOutpostName,
    getBestComboForBase,
    findBestOutpostCombination,
    formatOutpostResult,
    formatFinalResult
};
