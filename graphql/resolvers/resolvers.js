const userResolvers     = require('./user/userResolvers');
const employeeResolvers = require('./employee/employeeResolvers');

// obj combining all resolvers
const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...employeeResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...employeeResolvers.Mutation
    }
};

module.exports = resolvers;