import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; // Використовуємо useDispatch та useSelector
import { updateItemQuantity, removeItemFromCart } from '../../store/action';

const CartItem = ({ id, color, size, quantity }) => {
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // Функція для отримання деталей продукту
    getProductDetails(id)
      .then((product) => {
        setProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (amount) => {
    if (amount === 0) {
      dispatch(removeItemFromCart(id, color)); // Видаляємо товар
    } else {
      dispatch(updateItemQuantity(id, color, size, quantity + amount)); // Оновлюємо кількість
    }
  };

  const handleDelete = () => {
    dispatch(removeItemFromCart(id, color)); // Видаляємо товар з кошика
  };

  if (loading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  if (error) {
    return (
      <Row className="justify-content-center">
        <Alert variant="danger">
          {error.message ? `Error: ${error.message}` : 'Error fetching product details. Please try again later.'}
        </Alert>
      </Row>
    );
  }

  if (!product) {
    return null; // Якщо продукт не знайдено
  }

  return (
    <Row className="cart-item justify-content-md-center align-items-center">
      <Col md={2}>
        <Card.Img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100px', height: '100px', borderRadius: '10px' }} 
        />
      </Col>
      <Col md={3}>
        <p><strong>{product.title}</strong></p>
        <p>Color: {color}</p>
        <p>Size: {size}</p>
      </Col>
      <Col md={2} style={{ display: 'flex', alignItems: 'center' }}>
        <Button 
          variant="outline-primary" 
          size="sm" 
          className={styles.amountButtons} 
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </Button>
        <p style={{ margin: '0 10px' }}>Quantity: {quantity}</p>
        <Button 
          variant="outline-primary" 
          size="sm" 
          className={styles.amountButtons} 
          onClick={() => handleQuantityChange(1)}
        >
          +
        </Button>
      </Col>
      <Col md={2}>
        <p>Price: ${product.price}</p>
      </Col>
      <Col md={1}>
        <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
      </Col>
    </Row>
  );
};

export default CartItem;
