const employeeMutations = require('../../mutations/employeeMutations');
const employeeQueries = require('../../queries/employeeQueries');

const employeeResolvers = {
    // query resolver
    Query: {
        // map to query
        ...employeeQueries
    },

    // mutation resolver
    Mutation: {
        // map to mutator
        ...employeeMutations
    }
};

module.exports = employeeResolvers;