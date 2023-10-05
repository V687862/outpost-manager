import React from 'react';
import {useSelector} from 'react-redux';
import {canProduceGood, getOutpostName} from "../redux/actions";
import {formatGoodNames} from "../Utilities/resourceutils"; // or utils

const OutpostResultComponent = ({outpost}) => {
    const outpostName = useSelector(state => getOutpostName(state, outpost.id));
    const manufacturableGoods = useSelector(state => {
        canProduceGood(state, outpost.id)
    });
    return (
        <div>
            <h3>{outpostName}</h3>
            {manufacturableGoods.length > 0
                ? <>Can manufacture: {formatGoodNames(manufacturableGoods)}</>
                : <>Cannot manufacture any goods with current resources.</>
            }
        </div>
    );
};
export default OutpostResultComponent;