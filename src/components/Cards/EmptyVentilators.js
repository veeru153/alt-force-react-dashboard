import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';

const EmptyVentilators = (props) => {
    const store = useSelector(state => state);
    const [ventilators, setVentilators] = useState( store.data.emptyVentilators );

    const handleChange = (val) => {
        if(val == "") {
            setVentilators(0);
        } else {
            setVentilators(parseInt(val))
        }
    }

    return (
        <Card 
            title="Empty Ventilators" 
            valType="emptyVentilators"
            value={ventilators} 
            changeVal={(val) => handleChange(val)}
        />
    )
}

export default EmptyVentilators;