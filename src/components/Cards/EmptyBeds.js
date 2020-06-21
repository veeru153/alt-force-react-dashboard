import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';

const EmptyBeds = (props) => {
    const store = useSelector(state => state);
    const [beds, setBeds] = useState( store.data.emptyBeds );

    const handleChange = (val) => {
        if(val == "") {
            setBeds(0);
        } else {
            setBeds(parseInt(val))
        }
    }
    
    return (
        <Card 
            title="Empty Beds" 
            valType="emptyBeds"
            value={beds} 
            changeVal={(val) => handleChange(val)}
        />
    )
}

export default EmptyBeds;