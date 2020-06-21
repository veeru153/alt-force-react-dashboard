import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';

const CovidBeds = (props) => {
    const store = useSelector(state => state);
    const [covidBeds, setCovidBeds] = useState( store.data.covidBeds );

    const handleChange = (val) => {
        if(val == "") {
            setCovidBeds(0);
        } else {
            setCovidBeds(parseInt(val))
        }
    }

    return (
        <Card 
            title="Beds for COVID-19 Patients" 
            valType="covidBeds"
            value={covidBeds} 
            changeVal={(val) => handleChange(val)} 
        />
    )
}

export default CovidBeds;