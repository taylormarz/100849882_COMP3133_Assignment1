const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./graphql/schemas/schemas');
const userResolvers = require('./graphql/resolvers/userResolvers');
const employeeResolvers = require('./graphql/resolvers/employeeResolvers');

const app = express();
const SERVER_PORT = process.env.PORT

// combining user and employee resolvers into one
const rootResolvers = {
    ...userResolvers,
    ...employeeResolvers
};

// db connection
connectDB();

app.use(express.json());
app.use(
    // api route
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: rootResolvers,
        graphiql: true
    })
);

app.listen(SERVER_PORT, () => {
    console.log(`Server started: http://localhost:${SERVER_PORT}/graphql`);
});