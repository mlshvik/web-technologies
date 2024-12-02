import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import styles from '../ProductList/ProductList.module.css';
import {Link} from "react-router-dom";

function ProductCatalogCard(props) {
    const { imageSrc, title, description, price, link } = props;

    return (
        <Col md={3}>
            <Card className={"mx-auto " + styles.cardHome}>
                <Card.Img variant="top" src={imageSrc} alt="Product Image" className={styles.cardImgTop} />
                <Card.Body>
                    <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                    <Card.Text className={styles.cardText}>{description}</Card.Text>
                    <Card.Text className={styles.cardText}>Price: ${price}</Card.Text>
                    <Button variant="primary" style={{backgroundColor:"#333", borderStyle:"none"}}><Link to={"/catalog/"+link} className={styles.showMore}>Show More</Link></Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCatalogCard;

