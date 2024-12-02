import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartReducer'; // Очищення кошика
import { Link, useNavigate } from 'react-router-dom'; // Використовуємо useNavigate для переходу на головну
import './Success.css';

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Використовуємо useNavigate для переходу

  // Функція для очищення кошика після повернення на головну
  const handleReturnToHome = () => {
    dispatch(clearCart()); // Очищення кошика
    navigate('/'); // Переходить на головну сторінку
  };

  return (
    <div className="success-container">
      <h2>"Thank you for your purchase!"</h2>
      <p>"Your order has been successfully placed."</p>
      <button onClick={handleReturnToHome} className="success-home-link">
      "Return to the homepage"
      </button>
    </div>
  );
};

export default Success;
