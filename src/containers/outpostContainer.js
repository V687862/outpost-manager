import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Outpost from '../components/outpost';
import {getOutpostName, removeOutpost, updateOutpostName, updateOutpostResource} from '../redux/actions';

const OutpostContainer = ({id}) => {
    const dispatch = useDispatch();
    const outpost = useSelector(state => state.outposts.find(o => o.id === id));
    const considerLinkingResources = useSelector(state => state.considerLinkingResources);

    const handleResourceChange = (resourceKey, isChecked) => {
        dispatch(updateOutpostResource(id, resourceKey, isChecked));
    };

    const handleNameChange = (newName) => {
        dispatch(updateOutpostName(id, newName));
    };

    const handleRemove = () => {
        dispatch(removeOutpost(id));
    };


    return (
        <Outpost
            {...outpost}
            key={id}
            name={getOutpostName}
            onResourceChange={handleResourceChange}
            onNameChange={handleNameChange}
            onRemove={handleRemove}
            considerLinkingResources={considerLinkingResources}
        />
    );
};

export default OutpostContainer;
