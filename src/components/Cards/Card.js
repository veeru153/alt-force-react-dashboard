import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CustomBtn from '../UI/CustomBtn/CustomBtn';

import styles from './Card.module.css';
import axios from 'axios';

const Card = (props) => {
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);

    const handleClick = async () => {
        if(update == true) {
            dispatch({ type: 'UPDATE_VALUE', valType: props.valType, value: props.value });
            
            let res = await axios.patch(`http://alt-force-hack-jaipur.herokuapp.com/api/hospital/${localStorage.getItem('altForce_hId')}/?format=json`, {
                "empty_beds": store.data.emptyBeds,
                "empty_ventilators": store.data.emptyVentilators,
                "covid_patients": store.data.covidPatients,
                "empty_covid_beds": store.data.covidBeds,
                "last_updated": store.data.lastUpdated
            })
        }
        setUpdate(!update);
    }

    return (
        <div className={styles.Card}>
            <div className={styles.cardTitleContainer}>
                <p className={styles.cardTitle}>{props.title}</p>
            </div>
            <div className={styles.cardValue}>
                <input 
                    type="text" 
                    name="cardValue" 
                    value={props.value} 
                    onChange={(e) => props.changeVal(e.target.value)} 
                    readOnly={!update} />
            </div>
            {
                update ? 
                <CustomBtn title="CONFIRM" bgColor="#FA6E64" click={handleClick}/> :
                <CustomBtn title="UPDATE" bgColor="#25CEDE" click={handleClick}/>
            }
        </div>
    )
}

export default Card;