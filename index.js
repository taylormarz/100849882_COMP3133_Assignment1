const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = express();
const SERVER_PORT = 4000;

app.listen(SERVER_PORT, () => {
    console.log('Sever started')
    // db connection
    connectDB();
    console.log('http://localhost:4000/')
});