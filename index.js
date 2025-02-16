const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./graphql/schemas/schemas');
const resolvers = require('./graphql/resolvers/resolvers');
require('dotenv').config();

const app = express();
const SERVER_PORT = process.env.PORT;

// db connection
connectDB().then(() => {
    // api route
    app.use(
        "/graphql",
        graphqlHTTP({
            schema,
            rootValue: resolvers,
            graphiql: true,
        })
    );

    // start server
    app.listen(SERVER_PORT, () => {
        console.log(`Server started: http://localhost:${SERVER_PORT}/graphql`);
    });

}).catch(err => {
    // incase db connection failed
    console.error('Database connection failed:', err);
});