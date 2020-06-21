import React, { useState } from 'react';

import styles from './SwitchBtn.module.css'

const SwitchBtn = (props) => {
    return (
        <label className={styles.switch}>
            <input 
                name="switchBtn"
                type="checkbox" 
                checked={props.label}
                value={props.label}
                onChange={props.setLabel}
            />
            <span className={[styles.slider, styles.round].join(' ')}></span>
        </label>
    )
}

export default SwitchBtn;