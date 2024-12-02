import React from 'react';
import {Card, Col} from 'react-bootstrap';
import styles from '../ProductList/ProductList.module.css';

function ProductCard(props) {
    const {imageSrc, title, description} = props;

    return (
        <Col md={4} >
            <Card className={"mx-auto " + styles.cardHome}>
                <Card.Img variant="top" src={imageSrc} alt="Product Image" className={styles.cardImgTop}/>
                <Card.Body>
                    <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                    <Card.Text className={styles.cardText}>{description}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;
