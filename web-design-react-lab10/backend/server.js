const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()
const PORT = 5000

app.use(bodyParser.json())

app.use(cors({
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
}))

// Routes
const productRoutes = require('./routes/productRoutes')
app.use('/api/products', productRoutes)

// Start server
app.listen(PORT, () => {
})
