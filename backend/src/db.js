const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
	const { MONGODB_URI } = process.env;

	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI is not set');
	}

	if (mongoose.connection.readyState >= 1) {
		return mongoose.connection.asPromise();
	}

	return mongoose.connect(MONGODB_URI, {
		autoIndex: true,
		serverSelectionTimeoutMS: 5000,
	});
};

module.exports = connectDB;
