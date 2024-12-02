import React from 'react';
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Image,
	Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useOrderSelector from '../../hooks/useOrderSelector';
import { addOrderToCart } from '../../store/cartReducer';
import {
	clearOrder,
	incrementOrderId,
	setColor,
	setQuantity,
	setSize,
} from '../../store/orderReducer';
import styles from '../ItemDetails/ItemDetails.module.css';

const ItemDetails = ({ data }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleGoBack = () => {
		const from = new URLSearchParams(location.search).get('source'); // Читаємо параметр `source`
		if (from === 'home') {
			navigate('/'); // Повертаємося на сторінку Home
		} else {
			navigate('/catalog'); // Повертаємося на сторінку Catalog
		}
	};

	const { quantity, color, size, orderId } = useOrderSelector();
	console.log(useOrderSelector());

	const handleAddToCart = () => {
		const item = {
			id: data.id,
			title: data.title,
			price: data.price,
			color: color,
			size: size,
			quantity: quantity,
			imageSrc: data.imageSrc,
			orderId: orderId,
		};
		dispatch(incrementOrderId());
		dispatch(addOrderToCart(item));
		dispatch(clearOrder());
		navigate('/cart');
	};

	const handleQuantityChange = e => {
		const newQuantity = e.target.value;
		console.log(`newQuantity ${newQuantity}`);
		dispatch(setQuantity(Number(newQuantity)));
	};

	const handleColorChange = color => {
		console.log(`color ${color}`);
		dispatch(setColor(color));
	};

	const handleSizeChange = size => {
		console.log(`size ${size}`);
		dispatch(setSize(size));
	};

	if (!data) {
		return <p>Loading item details...</p>;
	}

	return (
		<Container className={styles.container}>
			<Card className={styles.cardContainer}>
				<Row>
					<Col sm={4}>
						<Image
							src={data.imageSrc}
							alt={data.title}
							fluid
							className={styles.picture}
						/>
					</Col>
					<Col sm={8}>
						<Card.Body>
							<Card.Title className={styles.title}>{data.title}</Card.Title>
							<Card.Text className={styles.description}>
								{data.description}
							</Card.Text>
							<Form fluid className={styles.ItemForm}>
								<Form.Group as={Row}>
									<Form.Label column md='2'>
										Quantity
									</Form.Label>
									<Col md='2'>
										<Form.Control
											type='number'
											name='quantity'
											value={quantity}
											onChange={handleQuantityChange}
											min={1}
										/>
									</Col>
								</Form.Group>
								<Row className={styles.fieldsRow}>
									<Form.Group as={Row}>
										<Form.Label column md='2'>
											Color
										</Form.Label>
										<Col md='4'>
											<Form.Control
												as='select'
												name='color'
												onChange={e => handleColorChange(e.target.value)}
											>
												<option value=''>{color}</option>
												{data.color_to_buy.map(choice => (
													<option key={choice} value={choice}>
														{choice}
													</option>
												))}
											</Form.Control>
										</Col>
									</Form.Group>

									<Form.Group as={Row}>
										<Form.Label column md='2'>
											Size
										</Form.Label>
										<Col md='4'>
											<Form.Control
												as='select'
												name='size'
												onChange={e => handleSizeChange(e.target.value)}
											>
												<option value=''>{size}</option>
												{data.size.map(choice => (
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
							variant='primary'
							className={styles.buttons}
							onClick={handleGoBack}
						>
							<div className={styles.goBack}>Go back</div>
						</Button>
						<Button
							variant='primary'
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
