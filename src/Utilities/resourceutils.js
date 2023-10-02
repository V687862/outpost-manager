import resources from "../data/resourcesdata";
import goods from "../data/goodsdata";


const getProducableGoods = outpostResources => {
    return Object.values(goods).filter(good => canProduceGood(outpostResources, good));
};


function unusedResources(outpostResources, producedGoods) {
    return outpostResources.filter(res => !producedGoods.some(good => good.resources.some(r => r.name === res)));
}



function formatGoodNames(goodList) {
    return goodList.map(g => g.name).join(", ");
}

function formatResourceList(outpost, considerLinkingResources) {
    const formatResourceString = (resourceString) => {
        let [code, name] = resourceString.split(" (");
        if (!code || !name) {
            return resourceString; // Return original string if it doesn't match the expected format.
        }
        name = name.slice(0, -1);
        return `${code} (${name})`;
    };

    const filteredResources = outpost.resources.filter(resName => {
        const resourceObj = resources[resName];
        if (!resourceObj) return false;
        if (considerLinkingResources) {
            return true; // Display all resources
        } else {
            return !resourceObj.isLinkResource; // Only display non-link resources
        }
    });

    return filteredResources.map(formatResourceString).join("\n");
}

export {getProducableGoods, unusedResources, formatGoodNames, formatResourceList};