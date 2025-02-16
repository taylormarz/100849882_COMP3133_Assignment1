const userQueries   = require('../../queries/userQueries');
const userMutations = require('../../mutations/userMutations');

const userResolvers = {
    // query resolver
    Query: {
        // map to query
        ...userQueries
    },
    // mutation resolver
    Mutation: {
        // map to mutator
        ...userMutations
    }
};

module.exports = userResolvers;