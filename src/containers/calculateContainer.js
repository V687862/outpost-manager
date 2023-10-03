import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Results from '../components/results';
import {calculate} from "../redux/actions";

const CalculateContainer = () => {
    const dispatch = useDispatch();
    const results = useSelector(state => state.results);
    const [outposts, setOutposts] = useState([]);
    const [considerLinkingResources, setConsiderLinkingResources] = useState(false);

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
        <div>
            <button onClick={handleCalculate}>Calculate</button>
            <Results data={results}/>
        </div>
    );
};

export default CalculateContainer;