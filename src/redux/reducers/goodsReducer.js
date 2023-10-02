import {CAN_PRODUCE_GOOD} from '../actiontypes';

const initialState = {
    canProduceGood: false,
};
const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAN_PRODUCE_GOOD:
            return {
                ...state,
                canProduceGood: action.payload,
            };
        default:
            return state;
    }
};

export default goodsReducer;