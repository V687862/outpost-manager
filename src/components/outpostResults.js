import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {canProduceGood, getOutpostName} from "../redux/actions";
import {formatGoodNames} from "../Utilities/resourceutils";

const OutpostResultComponent = ({outpost}) => {
    const dispatch = useDispatch();

    // Dispatch actions to fetch data
    useEffect(() => {
        if (outpost && outpost.id != null) {
            dispatch(getOutpostName(outpost.id));
            dispatch(canProduceGood(outpost.id));
        }
    }, [dispatch, outpost]);

    // Use selectors to get data from the Redux store
    const outpostName = useSelector(state => state.outpost.outpostName);
    const manufacturableGoods = useSelector(state => state.resource.canProduceGood); // Adjust according to your state structure

    return (
        <div>
            <h3>{outpostName}</h3>
            {manufacturableGoods && manufacturableGoods.length > 0
                ? <>Can manufacture: {formatGoodNames(manufacturableGoods)}</>
                : <>Cannot manufacture any goods with current resources.</>
            }
        </div>
    );
};

OutpostResultComponent.defaultProps = {
    outpost: {},
};

export default OutpostResultComponent;