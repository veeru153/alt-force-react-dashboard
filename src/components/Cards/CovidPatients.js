import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';

const CovidPatients = (props) => {
    const store = useSelector(state => state);
    const [covidPatients, setCovidPatients] = useState( store.data.covidPatients );

    const handleChange = (val) => {
        if(val == "") {
            setCovidPatients(0);
        } else {
            setCovidPatients(parseInt(val))
        }
    }

    return (
        <Card 
            title="COVID-19 Patients" 
            valType="covidPatients"
            value={covidPatients} 
            changeVal={(val) => handleChange(val)} 
        />
    )
}

export default CovidPatients;