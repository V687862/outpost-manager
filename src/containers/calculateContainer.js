import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {calculate} from "../redux/actions";
import Calculate from "../components/calculate";

const CalculateContainer = () => {
    const dispatch = useDispatch();
    const [outposts] = useState([]);
    const [considerLinkingResources] = useState(false);

    const handleCalculate = () => {
        // Ensure outposts and considerLinkingResources are defined and valid
        if (!Array.isArray(outposts) || typeof considerLinkingResources !== 'boolean') {
            console.error('Invalid inputs:', {outposts, considerLinkingResources});
            // Optionally: Provide user feedback about the error
            return;
        }

        // Dispatch the calculate action
        dispatch(calculate(outposts, considerLinkingResources));
    };

    return (
        <Calculate onCalculate={handleCalculate}/>
    );
};

export default CalculateContainer;