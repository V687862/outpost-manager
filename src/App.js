import React, {useState} from 'react';
import resources from './data/resourcesdata';
import goods from './data/goodsdata';
import Outpost from './components/outpost';

const App = () => {
    const [outposts, setOutposts] = useState([{ id: 1, name: '', resources: [], removable: false }]);
    const [results, setResults] = useState([]);
    const [considerLinkingResources, setConsiderLinkingResources] = useState(true);
    const memo = {};
    function addOutpost() {
        setOutposts(prev => [...prev, { id: prev.length + 1, name: '', resources: [] }]);
    }

    function removeOutpost(outpostId) {
        setOutposts(prev => prev.filter(o => o.id !== outpostId));
    }

    const handleResourceToggle = (outpostId, resourceName) => {
        setOutposts(prev => prev.map(outpost => {
            if (outpost.id === outpostId) {
                const updatedResources = outpost.resources.includes(resourceName) ? outpost.resources.filter(r => r !== resourceName) : [...outpost.resources, resourceName];
                return { ...outpost, resources: updatedResources };
            }
            return outpost;
        }));
    };

    const canProduceGood = (outpostResources, good) => {
        return good.resources.every(resourceOrGood => {
            const isResource = resources[resourceOrGood.name];
            const isGood = goods[resourceOrGood.name];
            return isResource
                ? (considerLinkingResources || !resourceOrGood.isLinkResource) && outpostResources.includes(resourceOrGood.name)
                : canProduceGood(outpostResources, goods[resourceOrGood.name]);
        });
    };

    const getProducableGoods = outpostResources => {
        return Object.values(goods).filter(good => canProduceGood(outpostResources, good));
    };
    function getOutpostResources(outpostId) {
        const outpost = outposts.find(o => o.id === outpostId);
        return outpost ? outpost.resources : [];
    }

    function unusedResources(outpostResources, producedGoods) {
        return outpostResources.filter(res => !producedGoods.some(good => good.resources.some(r => r.name === res)));
    }

    function getOutpostName(outpostId) {
        if (outpostId <= 0 || outpostId > outposts.length) return "Unknown";
        const outpost = outposts[outpostId - 1];
        return outpost ? (outpost.name || `Outpost ${outpostId}`) : "Unknown";
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
            name = name.slice(0, -1); // Remove the trailing ')'
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

    function calculate() {
        const N = outposts.length;
        const { bestBaseOutpost, bestLinkedOutposts, bestProducedGoods, bestUnusedResources } = findBestOutpostCombination(N);

        const newResults = outposts.map(outpost => formatOutpostResult(outpost));

        const finalResult = formatFinalResult(
            bestBaseOutpost,
            bestLinkedOutposts,
            bestProducedGoods,
            bestUnusedResources,
            considerLinkingResources
        );

        setResults([...newResults, ...finalResult]);
    }

    function findBestOutpostCombination(N) {
        let maxGoodsProduced = 0;
        let bestBaseOutpost = 0;
        let bestLinkedOutposts = [];
        let bestProducedGoods = [];
        let bestUnusedResources = [];

        for (let i = 0; i < N; i++) {
            const {
                bestComboGoods,
                bestComboOutposts,
                bestComboProducedGoods,
                bestComboUnusedResources
            } = findBestComboForBase(i, N, []);

            console.log(`For outpost ${i}: Best Combo Goods: ${bestComboGoods}, Best Combo Outposts: ${bestComboOutposts.join(', ')}, Best Combo Produced Goods: ${bestComboProducedGoods.join(', ')}, Best Combo Unused Resources: ${bestComboUnusedResources.join(', ')}`);

            if (bestComboGoods > maxGoodsProduced) {
                maxGoodsProduced = bestComboGoods;
                bestBaseOutpost = outposts[i].id;
                bestLinkedOutposts = bestComboOutposts;
                bestProducedGoods = bestComboProducedGoods;
                bestUnusedResources = bestComboUnusedResources;

                console.log(`Updated Best Base Outpost to ${outposts[i].id} with max goods of ${maxGoodsProduced}.`);
            }
            return {
                bestBaseOutpost,
                bestLinkedOutposts,
                bestProducedGoods,
                bestUnusedResources
            };
        }

        console.log(`Final Best Outpost: ${bestBaseOutpost}, Linked Outposts: ${bestLinkedOutposts.join(', ')}, Produced Goods: ${bestProducedGoods.join(', ')}, Unused Resources: ${bestUnusedResources.join(', ')}`);
        return { bestBaseOutpost, bestLinkedOutposts, bestProducedGoods, bestUnusedResources };
    }


    function findBestComboForBase(i, N, previousOutposts) {
        const baseOutpostResources = getOutpostResources(outposts[i].id);
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

        return { bestComboGoods, bestComboOutposts, bestComboProducedGoods, bestComboUnusedResources };
    }

    function findBestLinkedCombo(i, j, N, previousResources, previousOutposts) {
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

    function formatFinalResult(bestBaseOutpost, bestLinkedOutposts, bestProducedGoods, bestUnusedResources, considerLinkingResources) {
        const results = [];

        function formatGoodNames(goodList) {
            return goodList.map(good => good.name).join(", ");
        }

        function getOutpostName(outpostID) {
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





    return (
        <div>

            <label>
                <input
                    type="checkbox"
                    checked={considerLinkingResources}
                    onChange={() => setConsiderLinkingResources(prev => !prev)}
                />
                Consider Linking Resources
            </label>

            {outposts.map(outpost => (
                <Outpost
                    key={outpost.id}
                    id={outpost.id}
                    name={outpost.name}
                    onResourceChange={handleResourceToggle}
                    onNameChange={(id, name) => {
                        const updatedOutposts = outposts.map(o => o.id === id ? { ...o, name } : o);
                        setOutposts(updatedOutposts);
                    }}
                    onRemove={removeOutpost}
                    considerLinkingResources={considerLinkingResources}
                />
            ))}
            <button onClick={addOutpost}>Add Outpost</button>
            <button onClick={calculate}>Calculate</button>

            <div id="results">
                {results.map((result, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: result }}></p>
                ))}
            </div>
        </div>
    );

};

export default App;