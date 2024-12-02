const express = require('express');
const connectDB = require('../config/db');
const router = express.Router();


router.get('/', async (req, res) => {
    const connection = await connectDB();

    try {
        const { size, color, search } = req.query; 
        let query = 'SELECT * FROM products';
        const queryParams = [];

        const filters = [];
        if (size) {
            filters.push('JSON_CONTAINS(size, ?)');
            queryParams.push(`"${size}"`);
        }
        if (color) {
            filters.push('JSON_CONTAINS(color, ?)');
            queryParams.push(`"${color}"`);
        }

        if (search) {
            filters.push('(title LIKE ? OR description LIKE ?)');
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        if (filters.length > 0) {
            query += ` WHERE ${filters.join(' AND ')}`;
        }

        const [products] = await connection.execute(query, queryParams);

        const formattedProducts = products.map(product => ({
            ...product,
            size: product.size,
            color: product.color,
            color_to_buy: product.color_to_buy,
        }));
        res.json(formattedProducts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    } finally {
        connection.end();
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await connectDB();
    try {
        const [rows] = await connection.execute('SELECT * FROM products WHERE link = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Product not found');
        }
        const product = rows[0];
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    } finally {
        connection.end();
    }
});

module.exports = router;
