const express = require('express');
const mongoose = require('mongoose');
const { buildSchema } = require('graphsql');
const { graphqlHTTP } = require('/');
const app = express();
const SERVER_PORT = 4000;

app.listen(SERVER_PORT, () => {
    console.log('Sever started')
    console.log('http://localhost:4000/graphql')
});

