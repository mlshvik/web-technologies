import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from '../heading/Heading.module.css';

const Heading = () => {
    return (
        <Container fluid className="mt-5">
            <Row className={styles.container}>
                <Col md={4}>
                    <Image src="images/heading_photo.png" alt="Image" fluid />
                </Col>
                <Col md={8} className={styles.textContainer}>
                    <div className={styles.text}>
                        <h2>Shopoholic</h2>
                        <p>Welcome to our sportswear store Shopoholic where style meets performance. Our store is a one-stop destination for all your sports and active lifestyle needs. We offer a wide range of high quality sportswear designed to improve your performance and keep you looking your best. Whether you are a fan of running, yoga, basketball or any other sport, you will find the perfect clothing and footwear to help you excel in your chosen activity. Our friendly and knowledgeable staff will help you find the right size and style to ensure you not only achieve the best results, but also look your best. Visit our store today and take your sportswear game to the next level!</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Heading;
