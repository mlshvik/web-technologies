const mysql = require('mysql2/promise')

const connectDB = async () => {
	try {
		const connection = await mysql.createConnection({
			host: 'localhost',
			user: 'root1',
			password: '1234567890',
			database: 'shopoholics',
		})
		console.log('Connected to MySQL')
		return connection
	} catch (error) {
		console.error(`Error connecting to MySQL: ${error.message}`)
		process.exit(1)
	}
}

module.exports = connectDB
