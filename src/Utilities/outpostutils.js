import {findBestComboForBase} from "../redux/actions";

function getOutpostName(outpostId, outposts) {
    if (outpostId <= 0 || outpostId > outposts.length) return "Unknown";
    const outpost = outposts[outpostId - 1];
    return outpost ? (outpost.name || `Outpost ${outpostId}`) : "Unknown";
}

function getBestComboForBase(i, N) {
    return findBestComboForBase(i, N, []);
}





export {
    getOutpostName,
    getBestComboForBase,
};
