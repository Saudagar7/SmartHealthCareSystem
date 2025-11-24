require('dotenv').config();

const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const consultRoutes = require('./routes/consultRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
}))

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/consultations', consultRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start server', error);
		process.exit(1);
	}
};

start();

module.exports = app;
