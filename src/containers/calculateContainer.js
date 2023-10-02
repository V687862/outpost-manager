import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {calculateThunk} from '../Utilities/outpostutils';
import Results from '../components/results';

const CalculateContainer = () => {
    const dispatch = useDispatch();
    // Assume that results are stored in the Redux state under a key named 'results'
    const results = useSelector(state => state.results);

    // Assume outposts and considerLinkingResources are determined somehow, e.g., from component state or from user input
    const [outposts, setOutposts] = useState([]);
    const [considerLinkingResources, setConsiderLinkingResources] = useState(false);

    const handleCalculate = () => {
        dispatch(calculateThunk(outposts, considerLinkingResources));
    };

    return (
        <div>
            {/* Some UI elements to determine outposts and considerLinkingResources, and trigger calculations */}
            <button onClick={handleCalculate}>Calculate</button>
            {/* Passing the results from the Redux store to the Results component as a prop */}
            <Results data={results} results={}/>
        </div>
    );
};

export default CalculateContainer;