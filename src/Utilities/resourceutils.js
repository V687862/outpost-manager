import resources from "../data/resourcesdata";


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

function formatGoodNames(goodList) {
    return goodList.map(good => good.name).join(", ");
}

export {formatResourceList, formatGoodNames};