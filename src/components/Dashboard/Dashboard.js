import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CovidBeds, CovidPatients, EmptyBeds, EmptyVentilators } from '../Cards/Cards';
import SwitchBtn from '../UI/SwitchBtn/SwitchBtn';
import { withRouter } from 'react-router-dom';
import auth0 from 'auth0-js';
import { useAuth0 } from '../../react-auth0-spa';
import axios from 'axios';

import styles from './Dashboard.module.css';

const Dashboard = (props) => {
    document.title = "Dashboard | Alt-Force COVID-19";
    const webAuth = new auth0.WebAuth({
        clientID: 'X6vuD8AiLJrjU2r2M5gomQARWvZKdycL',
        domain: 'alt-force.us.auth0.com',
        redirectUri: 'http://localhost:3000',
        responseType: 'token id_token',
        audience: 'https://alt-force/api'
    });
    const dispatch = useDispatch();

    if(!window.location.hash) {
        props.history.push('/register');
    } else {
        let state = JSON.parse(localStorage.getItem('altForce_hospital'));
        webAuth.parseHash({ hash: window.location.hash }, async (err, authResult) => {
            if(err) {
                return console.log(err);
            } else if(authResult) {
                localStorage.setItem('altForce_hId', authResult.idTokenPayload.sub.split('|')[1]);
                dispatch({ type: 'INIT_DASHBOARD', store: JSON.parse(localStorage.getItem('altForce_hospital')), id: localStorage.getItem('altForce_hId')  });
                try {
                    let res = await axios({
                        method: 'post',
                        url: 'http://alt-force-hack-jaipur.herokuapp.com/api/hospital/?format=json',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': authResult.accessToken
                        },
                        data: {
                            "id": authResult.idTokenPayload.sub.split('|')[1],
                            "hospital_name": state.name,
                            "email": state.email,
                            "latitude": state.coords[0],
                            "longitude": state.coords[1],
                            "government_hospital": state.govtHospital,
                            "ambulance_facility": state.ambulance,
                            "covid_exclusive": state.covidExclusive,
                            "accepting_covid_patients": state.data.accepting,
                            "empty_beds": state.data.emptyBeds,
                            "empty_ventilators": state.data.emptyVentilators,
                            "covid_patients": state.data.covidPatients,
                            "empty_covid_beds": state.data.covidBeds,
                            "last_updated": state.data.lastUpdated
                        }
                    })
                } catch (err) {
                    console.log(err);
                }

                return console.log(authResult);
            }
        });
    }
    const store = useSelector(state => state);


    const [accepting, setAccepting] = useState( store.data.accepting );
    console.log(store);

    const handleToggle = async () => {
        dispatch({ type: 'TOGGLE_STATUS', toggleLabel: "accepting", toggleResult: !accepting });
        let res = await axios.patch(`http://alt-force-hack-jaipur.herokuapp.com/api/hospital/${localStorage.getItem('altForce_hId')}/?format=json`, {
                "accepting_covid_patients": store.data.accepting
            })
        setAccepting(!accepting);
    }

    return (
        <div className={["d-flex flex-column align-items-center text-center", styles.Dashboard].join(' ')}>
            <div className={["row w-100 px-5 py-4", styles.header].join(' ')}>
                <div className={["col-6 text-left", styles.headerText].join(' ')}>EasyHospital</div>
                <div className={["col-6 text-right", styles.headerText].join(' ')}>
                    { store.name }
                </div>
            </div>
            <div className="my-3 d-flex flex-row flex-wrap text-center justify-content-around align-items-center" style={{ width: '90%' }}>
                <EmptyBeds />
                <EmptyVentilators />
                <CovidPatients />
                <CovidBeds />
            </div>
             <div className={["row w-100 px-5 py-4", styles.footer].join(' ')}>
                 <div className={["col-5 text-left ml-1", styles.footerText].join(' ')}>
                     Accepting COVID-19 Patients?
                    <SwitchBtn label={accepting} setLabel={handleToggle}/>
                 </div>
                 <div className={["col-5 offset-1 text-right mr-1", styles.footerText].join(' ')}>
                    Last Updated {store.data.lastUpdated}
                </div>
             </div>
        </div>
    )
}

export default withRouter(Dashboard);