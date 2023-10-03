import React from 'react';
import PropTypes from 'prop-types';
import goods from "../data/goodsdata";
import {canProduceGood} from "../redux/actions";
import {formatResourceList} from "../Utilities/resourceutils";

const Results = ({
                     outposts,
                     bestBaseOutpost,
                     bestLinkedOutposts,
                     bestProducedGoods,
                     bestUnusedResources,
                     considerLinkingResources
                 }) => {

    function formatGoodNames(goodList) {
        return goodList.map(good => good.name).join(", ");
    }

    function getOutpostName(outpostID) {
        const outpost = outposts.find(o => o.id === outpostID);
        return outpost ? outpost.name : "Unknown";
    }

    function formatOutpostResult(outpost) {
        const outpostResources = outpost.resources;
        const manufacturableGoods = Object.values(goods).filter(good => canProduceGood(outpostResources, good));

        return manufacturableGoods.length
            ? `<h3>${getOutpostName(outpost.id)}</h3>Can manufacture: ${formatGoodNames(manufacturableGoods)}`
            : `<h3>${getOutpostName(outpost.id)}</h3>Cannot manufacture any goods with current resources.`;
    }

    function formatFinalResult() {
        const results = [];
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

    // Use the functions to format results and render them
    const formattedOutpostResults = outposts.map(formatOutpostResult);
    const formattedFinalResults = formatFinalResult();

    return (
        <div>
            <h2>Outpost Results</h2>
            {formattedOutpostResults.map((result, index) => (
                <div key={index} dangerouslySetInnerHTML={{__html: result}}/>
            ))}

            <h2>Final Results</h2>
            {formattedFinalResults.map((result, index) => (
                <p key={index}>{result}</p>
            ))}
        </div>
    );
};

// Define PropTypes
Results.propTypes = {
    outposts: PropTypes.array.isRequired,
    bestBaseOutpost: PropTypes.number.isRequired,
    bestLinkedOutposts: PropTypes.array.isRequired,
    bestProducedGoods: PropTypes.array.isRequired,
    bestUnusedResources: PropTypes.array.isRequired,
    considerLinkingResources: PropTypes.bool.isRequired
};

export default Results;