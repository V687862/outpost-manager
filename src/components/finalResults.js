import React from 'react';
import {useSelector} from 'react-redux';
import {formatGoodNames, formatResourceList} from "../Utilities/resourceutils"; // or utils

const FinalResultComponent = () => {
    const bestBaseOutpost = useSelector(state => state.bestBaseOutpost);
    const bestLinkedOutposts = useSelector(state => state.bestLinkedOutposts);
    const bestProducedGoods = useSelector(state => state.bestProducedGoods);
    const bestUnusedResources = useSelector(state => state.bestUnusedResources);
    const considerLinkingResources = useSelector(state => state.considerLinkingResources);
    const outposts = useSelector(state => state.outposts);
    const getOutpostName = useSelector(state => getOutpostName(state));

    return (
        <div>
            <p>The best primary outpost to get the maximum number of goods
                is: {getOutpostName(bestBaseOutpost, outposts)}.</p>
            <p>Goods Produced at {getOutpostName(bestBaseOutpost, outposts)}: {formatGoodNames(bestProducedGoods)}.</p>

            {considerLinkingResources && (
                <p>Unused resources
                    at {getOutpostName(bestBaseOutpost, outposts)}: {bestUnusedResources.join(", ")}.</p>
            )}

            {bestLinkedOutposts.length > 0 && (
                <>
                    <p>Linked Outposts
                        to {getOutpostName(bestBaseOutpost, outposts)}: {bestLinkedOutposts.map(id => getOutpostName(id, outposts)).join(', ')}.</p>
                    {bestLinkedOutposts.map(outpostID => (
                        <p key={String(outpostID)}>
                            {getOutpostName(outpostID, outposts)} provides the following resources:
                            {/* Assuming formatResourceList is a utility function that formats the resource list */}
                            {formatResourceList(outposts.find(o => o.id === outpostID), considerLinkingResources)}
                        </p>
                    ))}
                </>
            )}
        </div>
    );
};
export default FinalResultComponent;