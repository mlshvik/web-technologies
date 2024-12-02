import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../ApplyButton/ApplyButton.module.css';
import products from "../../data/data";


const filterData = (data, setData, states, filters) => {

    let filteredData = data;
    for (let i = 0; i < states.length; i++) {
        const state = states[i];
        const filter = filters[i];

        if (state && filter) {
            filteredData = filter(state, filteredData);
        }
    }

    setData(filteredData);
}
const ApplyButton = ({setData, states, filters}) => {
    return (
        <Button
            variant="primary" className={styles.apply} onClick={() => filterData(products, setData, states, filters)}>
            Apply
        </Button>
    );
};

export default ApplyButton;