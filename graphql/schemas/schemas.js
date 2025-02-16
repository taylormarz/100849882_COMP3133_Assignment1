const fs = require('fs');
const path = require('path');
const { buildSchema } = require('graphql');

// read independent schema files
const userSchema = fs.readFileSync(path.join(__dirname, 'userSchema.graphql'), 'utf8');
const employeeSchema = fs.readFileSync(path.join(__dirname, 'employeeSchema.graphql'), 'utf8');

// base schema to define query/mutation globally (getting a duplication error if i dont do this)
const baseSchema = `
    type Query
    type Mutation
`;

// merge schemas
const schema = buildSchema(`${baseSchema}\n${userSchema}\n${employeeSchema}`);

module.exports = schema;