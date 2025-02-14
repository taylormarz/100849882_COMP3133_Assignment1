const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to DB');

        await mongoose.connect('dbURL', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error.message);
    }
};

module.exports = connectDB;