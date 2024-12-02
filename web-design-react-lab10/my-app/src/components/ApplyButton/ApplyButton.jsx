import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../ApplyButton/ApplyButton.module.css';
import axios from 'axios';
// import {getAllColors, getFilteredProducts} from "../../requests/products";

const ApplyButton = ({ setData, states }) => {
    const handleApplyFilters = async () => {
        const [size, color, search] = states;

        try {
            
            const response = await axios.get('http://localhost:5000/api/products', {
                params: { size, color, search }, 
            });
            setData(response.data); 
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    return (
        <Button
            variant="primary"
            className={styles.apply}
            onClick={handleApplyFilters} 
        >
            Apply
        </Button>
    );
};

export default ApplyButton;
