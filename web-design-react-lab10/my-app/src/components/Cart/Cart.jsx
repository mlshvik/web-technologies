import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCartSelector from '../../hooks/useCartSelector';
import { clearCart } from '../../store/orderReducer';
import styles from '../Cart/Cart.module.css';
import CartItem from '../CartItem/CartItem';
import Checkout from '../Checkout/Checkout';
import Success from '../Success/Success';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalPrice } = useCartSelector();
    const allOrders = Object.values(cartItems).flatMap(product => product.orders);

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

    const openCheckoutModal = () => {
        setIsCheckoutOpen(true);
    };

    const closeCheckoutModal = () => {
        setIsCheckoutOpen(false);
    };

    const handleSuccess = () => {
        dispatch(clearCart()); // Очищення кошика
        setIsCheckoutOpen(false); // Закриваємо модальне вікно
        setIsOrderSuccessful(true); // Відображаємо Success
    };

    const closeSuccessMessage = () => {
        setIsOrderSuccessful(false); // Закриваємо Success
    };

    if (allOrders.length === 0 && !isOrderSuccessful) {
        return (
            <Container className={styles.CartPage}>
                <h2 className={styles.title}>Shopping Cart</h2>
                <p className={styles.paragraph}>Your cart is empty.</p>
                <img 
                    src="/images/sad_cat_cart.png" 
                    alt="Empty cart illustration" 
                    className={styles.emptyCartImage} 
                />
                <Button variant="secondary">
                    <Link to="/catalog" className={styles.backButton}>
                        Back to Catalog
                    </Link>
                </Button>
            </Container>
        );
    }

    return (
        <Container className={styles.fullCart}>
            <h2 className={styles.title}>Shopping Cart</h2>

            {isOrderSuccessful ? (
                <Success onClose={closeSuccessMessage} />
            ) : (
                <>
                    {allOrders.map(item => (
                        <CartItem key={item.id} product={item} />
                    ))}
                    <Row className={`justify-content-start ${styles.amountText}`}>
                        <Col md={2}>
                            <h4>Total Price: ${String(totalPrice)}</h4>
                        </Col>
                    </Row>
                    <Row className={`justify-content-between ${styles.downButtons}`}>
                        <Col md={2}>
                            <Button variant='secondary'>
                                <Link to='/catalog' className={styles.backButton}>
                                    Back to Catalog
                                </Link>
                            </Button>
                        </Col>
                        <Col md={1}>
                            <Button variant='primary' className={styles.continueButton} onClick={openCheckoutModal}>
                                Continue
                            </Button>
                        </Col>
                    </Row>
                </>
            )}

            {/* Модальне вікно */}
            {isCheckoutOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Checkout onClose={closeCheckoutModal} onSuccess={handleSuccess} />
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Cart;
