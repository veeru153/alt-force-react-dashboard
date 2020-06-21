import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomBtn from '../UI/CustomBtn/CustomBtn'
import { withRouter } from 'react-router-dom';
import auth0 from 'auth0-js';


import styles from './Register.module.css'
import axios from 'axios';

const webAuth = new auth0.WebAuth({
    clientID: 'X6vuD8AiLJrjU2r2M5gomQARWvZKdycL',
    domain: 'alt-force.us.auth0.com',
    redirectUri: 'http://localhost:3000',
    responseType: 'token id_token',
    audience: 'https://alt-force/api'
});

const RegistrationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    govtHospital: yup.bool().required(),
    covidExclusive: yup.bool().required(),
    ambulance: yup.bool().required(),
})

const Register = (props) => {
    document.title = "Register | Alt-Force COVID-19";
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const initValues = {
        name: store.name,
        email: store.email,
        govtHospital: store.govtHospital,
        ambulance: store.ambulance,
        covidExclusive: store.covidExclusive,
    }

    return (
        <div className={["d-flex flex-column align-items-center text-center", styles.Register].join(' ')}>
            <Formik
                initialValues={initValues}
                validationSchema={RegistrationSchema}
                onSubmit={ async (values, actions) => {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        let newState = {
                            ...store,
                            name: values.name,
                            email: values.email,
                            govtHospital: values.govtHospital,
                            ambulance: values.ambulance,
                            covidExclusive: values.covidExclusive,
                            coords: [pos.coords.latitude, pos.coords.longitude]
                        }
                        dispatch({ type: 'TEMP_STORE', store: newState });

                        webAuth.passwordlessStart({
                            connection: 'email',
                            send: 'code',
                            email: values.email
                        }, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res);
                                localStorage.setItem('altForce_hospital', JSON.stringify(newState));
                                props.history.push("/verify");
                            }
                        });
                    })
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit} className={styles.formContainer}>
                        <div className={styles.formHeader}>
                            <p>Alt-Force COVID-19 EasyHospital Dashboard</p>
                            <p>Register</p>
                        </div>
                        <div className={styles.formInputContainer}>
                            <label>Name: </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Hospital Name"
                                autoComplete="off"
                                onChange={props.handleChange('name')}
                                value={props.values.name}
                            />
                        </div>

                        <div className={styles.formInputContainer}>
                            <label>Email: </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email ID"
                                autoComplete="off"
                                onChange={props.handleChange('email')}
                                value={props.values.email}
                            />
                        </div>

                        <div className={styles.checkboxContainer}>
                            <div className={styles.checkboxInputs}>
                                <label className={styles.checkboxLabel}>Government Hospital?</label>
                                <label className={styles.switch}>
                                    <input
                                        name="govtHospital"
                                        type="checkbox"
                                        checked={props.values.govtHospital}
                                        onChange={props.handleChange('govtHospital')}
                                        value={props.values.govtHospital}
                                    />
                                    <span className={[styles.slider, styles.round].join(' ')}></span>
                                </label>
                            </div>

                            <div className={styles.checkboxInputs}>
                                <label className={styles.checkboxLabel}>COVID-19 Exclusive?</label>
                                <label className={styles.switch}>
                                    <input
                                        name="covidExclusive"
                                        type="checkbox"
                                        checked={props.values.covidExclusive}
                                        onChange={props.handleChange('covidExclusive')}
                                        value={props.values.covidExclusive}
                                    />
                                    <span className={[styles.slider, styles.round].join(' ')}></span>
                                </label>
                            </div>

                            <div className={styles.checkboxInputs}>
                                <label className={styles.checkboxLabel}>Ambulance Facility?</label>
                                <label className={styles.switch}>
                                    <input
                                        name="ambulance"
                                        type="checkbox"
                                        checked={props.values.ambulance}
                                        onChange={props.handleChange('ambulance')}
                                        value={props.values.ambulance}
                                    />
                                    <span className={[styles.slider, styles.round].join(' ')}></span>
                                </label>
                            </div>
                        </div>
                        <CustomBtn title="NEXT" bgColor="#25CEDE" click={props.submitForm} />
                    </form>
                )}

            </Formik>

        </div>
    )
}

export default withRouter(Register);