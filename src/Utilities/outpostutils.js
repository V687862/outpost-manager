const generateNewResults = (outposts) => {
    return outposts.map(outpost => formatOutpostResult(outpost));
};

const generateFinalResult = (
    bestBaseOutpost,
    bestLinkedOutposts,
    bestProducedGoods,
    bestUnusedResources,
    considerLinkingResources
) => {
    return formatFinalResult(
        bestBaseOutpost,
        bestLinkedOutposts,
        bestProducedGoods,
        bestUnusedResources,
        considerLinkingResources
    );
};




