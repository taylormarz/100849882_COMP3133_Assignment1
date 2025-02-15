require('dotenv').config();
const mongoose = require('mongoose');
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

const connectDB = async () => {
    try {
        console.log('Attempting to connect to DB');

        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.vb98d.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error.message);
    }
};

module.exports = connectDB;