require('dotenv').config();
const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(`${dbURL}`, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error.message);
    }
};

module.exports = connectDB;