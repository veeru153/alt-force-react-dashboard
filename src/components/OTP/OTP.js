import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomBtn from '../UI/CustomBtn/CustomBtn'
import { withRouter } from 'react-router-dom';
import auth0 from 'auth0-js';


import styles from './OTP.module.css'

const webAuth = new auth0.WebAuth({
    clientID: 'X6vuD8AiLJrjU2r2M5gomQARWvZKdycL',
    domain: 'alt-force.us.auth0.com',
    redirectUri: 'http://localhost:3000',
    responseType: 'token id_token',
    audience: 'https://alt-force/api'
});

const OTPSchema = yup.object({
    code: yup.string().required().length(6)
})

const OTP = (props) => {
    document.title = "Verify | Alt-Force COVID-19";
    const store = useSelector(state => state)
    const dispatch = useDispatch();

    if(store.email.length == 0) {
        props.history.push("/")
    }

    return (
        <div className={["d-flex flex-column align-items-center text-center", styles.Register].join(' ')}>
            <Formik
                initialValues={{ code: "" }}
                validationSchema={OTPSchema}
                onSubmit={ (values, actions) => {
                    webAuth.passwordlessLogin({
                        connection: 'email',
                        email: store.email,
                        verificationCode: `${values.code}`
                    }, (err, res) => {
                        if(err) {
                            console.log(err);
                            localStorage.removeItem('hospital');
                            props.history.push('/register');
                        } else {
                            console.log(res);
                        }
                    });
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit} className={styles.formContainer}>
                        <div className={styles.formHeader}>
                            <p>Alt-Force COVID-19 Dashboard</p>
                            <p>Verification</p>
                        </div>
                        <div className={styles.formInputContainer}>
                            <label>OTP: </label>
                            <input
                                name="otp"
                                type="number"
                                placeholder="XXXXXX"
                                autoComplete="off"
                                onChange={props.handleChange('code')}
                                value={props.values.code}
                            />
                        </div>
                        <CustomBtn title="VERIFY" bgColor="#25CEDE" click={props.submitForm} />
                    </form>
                )}

            </Formik>

        </div>
    )
}

export default withRouter(OTP);