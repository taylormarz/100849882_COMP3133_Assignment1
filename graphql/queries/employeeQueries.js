const Employee = require('../../model/employees');

const employeeQueries = {
    // gets list of all employees in db
    listAllEmployees: async () => {
        try {
            // searches db for all employees
            const employees = await Employee.find();
            // returns obj list of employees
            return employees;

        } catch (error) {
            // if no employees are found
            throw new Error('No employees currently exist in the database.');
        }
    },

    // searches for specific employee in db by their id
    searchEmployeeById: async (_, { id }) => {
        try {
            const employee = await Employee.findById(id);
            // if there's no employee with matching id in db
            if(!employee) {
                throw new Error('No employee matching that id was found in database.');
            }
            // return employee obj
            return employee;

        } catch (error) {
            // just incase unexpected error occurs
            throw new Error('An error occured while searching for employee.');
        }
    },

    // searches for employee(s) with specific designation or department
    searchEmployeeByDesDep: async (_, { designation, department }) => {
        try {
            const searchFilter = {};
            if(designation) searchFilter.designation = designation;
            if(department) searchFilter.department = department;

            const employees = await Employee.find(searchFilter);
            return employees;

        } catch (error) {
            // if no employee in db with matching designation or department
            throw new Error('No employees found that match that designation/department.');
        }
    }
};

module.exports = employeeQueries;