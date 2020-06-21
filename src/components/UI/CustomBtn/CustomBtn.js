import React from 'react';

import styles from './CustomBtn.module.css';

const CustomBtn = (props) => {
    const btnColor = {
        backgroundColor: props.bgColor,
    }

    return (
        <button className={styles.btn} style={btnColor} onClick={props.click} type='button'>
            <span className={styles.btnText}>{props.title}</span>
        </button>
    )
}

export default CustomBtn;