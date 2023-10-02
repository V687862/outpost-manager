import goods from "../data/goodsdata";
import {
    canProduceGood,
    formatGoodNames,
    formatResourceList,
    getProducableGoods,
    unusedResources
} from "./resourceutils";
import {setResults} from "../redux/actions";


const memo = {};

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
function updateBestCombo(bestCombo, newCombo, outposts, i) {
    const { bestComboGoods } = newCombo;

    if (bestComboGoods > bestCombo.maxGoodsProduced) {
        console.log(`Updated Best Base Outpost to ${outposts[i].id} with max goods of ${bestComboGoods}.`);
        return {
            maxGoodsProduced: bestComboGoods,
            bestBaseOutpost: outposts[i].id,
            bestLinkedOutposts: newCombo.bestComboOutposts,
            bestProducedGoods: newCombo.bestComboProducedGoods,
            bestUnusedResources: newCombo.bestComboUnusedResources
        };
    }

    return bestCombo;
}

// Main function to find the best outpost combination



function findBestLinkedCombo(i, j, N, outposts, previousResources, previousOutposts) {
    const memoKey = `${i}-${j}-${previousOutposts.join('-')}`;

    if (memo[memoKey]) {
        console.log(`Using memoized result for key ${memoKey}...`);
        return memo[memoKey];
    }

    const producableGoods = getProducableGoods(previousResources);
    let comboResources = unusedResources(previousResources, getProducableGoods(previousResources));

    console.log(`Finding best linked combo for base outpost ${i} and linked outpost ${j}...`);

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

    memo[memoKey] = { bestComboGoods, bestComboOutposts, bestComboProducedGoods, bestComboUnusedResources };

    return { bestComboGoods, bestComboOutposts, bestComboProducedGoods, bestComboUnusedResources };
}


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
    getOutpostResources,
    getOutpostName,
    getBestComboForBase,
    updateBestCombo,
    findBestOutpostCombination,
    findBestLinkedCombo,
    formatOutpostResult,
    formatFinalResult
};
