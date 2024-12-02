import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux'; // Використовуємо useDispatch та useSelector
import {
	decrementOrderQuantity,
	deleteOrder,
	incrementOrderQuantity,
} from '../../store/cartReducer';

const CartItem = ({ product }) => {
	console.log(product);
	const dispatch = useDispatch();

	const handleQuantityChange = amount => {
		// if (amount === 0) {
		//   dispatch(removeItemFromCart(id, color)); // Видаляємо товар
		// } else {
		//   dispatch(updateItemQuantity(id, color, size, quantity + amount)); // Оновлюємо кількість
		// }
	};

	const handleDelete = () => {
		dispatch(deleteOrder({ id: product.id, orderId: product.orderId }));
	};

	return (
		<Row className='cart-item justify-content-md-center align-items-center'>
			<Col md={2}>
				<Card.Img
					src={product.imageSrc}
					alt={product.title}
					style={{ width: '100px', height: '100px', borderRadius: '10px' }}
				/>
			</Col>
			<Col md={3}>
				<p>
					<strong>{product.title}</strong>
				</p>
				<p>Color: {product.color}</p>
				<p>Size: {product.size}</p>
			</Col>
			<Col md={2} style={{ display: 'flex', alignItems: 'center' }}>
				<Button
					variant='outline-primary'
					size='sm'
					onClick={() =>
						dispatch(
							decrementOrderQuantity({
								id: product.id,
								orderId: product.orderId,
							})
						)
					}
				>
					-
				</Button>
				<p style={{ margin: '0 10px' }}>Quantity: {product.quantity}</p>
				<Button
					variant='outline-primary'
					size='sm'
					onClick={() =>
						dispatch(
							incrementOrderQuantity({
								id: product.id,
								orderId: product.orderId,
							})
						)
					}
				>
					+
				</Button>
			</Col>
			<Col md={2}>
				<p>Price: ${product.price}</p>
			</Col>
			<Col md={1}>
				<Button variant='outline-danger' onClick={handleDelete}>
					Delete
				</Button>
			</Col>
		</Row>
	);
};

export default CartItem;
