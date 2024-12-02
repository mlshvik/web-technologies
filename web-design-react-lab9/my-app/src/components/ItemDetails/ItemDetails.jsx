import React from 'react';
import { Button, Container, Form, Col, Row, Card, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/action"; // Імпортуємо дію для додавання в кошик
import styles from '../ItemDetails/ItemDetails.module.css';

const ItemDetails = ({ data }) => {
    const location = useLocation(); // Отримуємо дані про поточний шлях
    const navigate = useNavigate(); // Використовується для переходу назад
    const dispatch = useDispatch(); // Використовуємо для виконання дій Redux

    const handleGoBack = () => {
        const from = new URLSearchParams(location.search).get('source'); // Читаємо параметр `source`
        if (from === 'home') {
            navigate('/'); // Повертаємося на сторінку Home
        } else {
            navigate('/catalog'); // Повертаємося на сторінку Catalog
        }
    };

    const handleAddToCart = () => {
        const selectedColor = document.querySelector("select[name='color']").value;
        const selectedSize = document.querySelector("select[name='size']").value;
        const quantity = parseInt(document.querySelector("input[name='quantity']").value);

        if (!selectedColor || !selectedSize) {
            alert("Please select both a color and a size.");
            return;
        }

        const item = {
            id: data.id,
            title: data.title,
            price: data.price,
            color: selectedColor,
            size: selectedSize,
            amount: quantity,
            imageSrc: data.imageSrc,
        };

        dispatch(addItemToCart(item)); // Додаємо товар у кошик
        alert("Item added to cart!");
    };

    if (!data) {
        return <p>Loading item details...</p>; // Обробка випадку, якщо дані ще не завантажені
    }

    return (
        <Container className={styles.container}>
            <Card>
                <Row>
                    <Col sm={4}>
                        <Image src={data.imageSrc} alt={data.title} fluid className={styles.picture} />
                    </Col>
                    <Col sm={8}>
                        <Card.Body>
                            <Card.Title className={styles.title}>{data.title}</Card.Title>
                            <Card.Text className={styles.description}>{data.description}</Card.Text>
                            <Form fluid>
                                <Form.Group as={Row}>
                                    <Form.Label column md="2">
                                        Quantity
                                    </Form.Label>
                                    <Col md="2">
                                        <Form.Control 
                                            type="number" 
                                            name="quantity" 
                                            defaultValue={1} 
                                            min={1} 
                                        />
                                    </Col>
                                </Form.Group>
                                <Row className={styles.fieldsRow}>
                                    <Form.Group as={Row}>
                                        <Form.Label column md="2">
                                            Color
                                        </Form.Label>
                                        <Col md="4">
                                            <Form.Control as="select" name="color">
                                                <option value="">Select Color</option>
                                                {data.color_to_buy.map((choice) => (
                                                    <option key={choice} value={choice}>
                                                        {choice}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column md="2">
                                            Size
                                        </Form.Label>
                                        <Col md="4">
                                            <Form.Control as="select" name="size">
                                                <option value="">Select Size</option>
                                                {data.size.map((choice) => (
                                                    <option key={choice} value={choice}>
                                                        {choice}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Col>
                </Row>
                <Row className={styles.bottomRow}>
                    <Col sm={8}>
                        <Card.Text className={styles.price}>Price: ${data.price}</Card.Text>
                    </Col>
                    <Col sm={4} className={styles.buttonsRow}>
                        <Button 
                            variant="primary" 
                            className={styles.buttons} 
                            onClick={handleGoBack}
                        >
                            <div className={styles.goBack}>Go back</div>
                        </Button>
                        <Button 
                            variant="primary" 
                            className={styles.buttons} 
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default ItemDetails;
