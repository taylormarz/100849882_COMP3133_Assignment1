const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        department: String!
        date_of_joining: String
        employee_photo: String
    }

    type LoginResponse {
        message: String!
        user: User
    }

    type Query {
        loginUser(username: String, email: String, password: String!): LoginResponse
        listAllEmployees: [Employee]
        searchEmployeesByDesignationOrDepartment(designation: String, department: String): [Employee]
        searchEmployeeById(eid: ID!): Employee
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        createNewEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, department: String!, date_of_joining: String, employee_photo: String): Employee
        updateEmployeeById(eid: ID!, first_name: String, last_name: String, email: String, gender: String, designation: String, salary: Float, department: String, date_of_joining: String, employee_photo: String): Employee
        deleteEmployeeById(eid: ID!): String
    }
`);

module.exports = schema;