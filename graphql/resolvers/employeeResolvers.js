const Employee = require('../../model/employees');

const employeeResolvers = {
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

    // create new employee in db
    createNewEmployee: async ({ first_name, last_name, email, gender, designation, salary, department, date_of_joining, employee_photo}) => {
        try {
            // new employee obj
            const newEmployee = new Employee({ 
                first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                department,
                date_of_joining,
                employee_photo
            });

            // save new employee to db
            await newEmployee.save();
            // return new employee obj
            return newEmployee;

        } catch (error) {
            // error incase new employee can't be created
            throw new Error('Error, could not create new employee.');
        }
    }, 

     // searches for employee(s) with specific designation or department
    searchEmployeesByDesignationOrDepartment: async ({ designation, department }) => {
        try {
            const searchFilter = {};

            // search filter for designation
            if (designation) {
                searchFilter.designation = designation;
            }

            // search filter for department
            if (department) {
                searchFilter.department = department;
            }

            // find employees matching filter
            const employees = await Employee.find(searchFilter);
            // return list of employees in db
            return employees;

        } catch (error) {
            // if no employee in db with matching designation or department
            throw new Error('Error searching employees: ' + error.message);
        }
    },

    // searches for specific employee in db by their id
    searchEmployeeById: async ({ eid }) => {
        try {
            const employee = await Employee.findById(eid);
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

    // update employee by their id
    updateEmployeeById: async ({ eid, first_name, last_name, email, gender, designation, salary, department, date_of_joining, employee_photo }) => {
        try {
            // find the employee by their id
            const employee = await Employee.findById(eid);
            
            // error incase employee can't be found
            if (!employee) {
                throw new Error('Employee not found');
            }
    
            // update whichever fields given
            if (first_name) employee.first_name = first_name;
            if (last_name) employee.last_name = last_name;
            if (email) employee.email = email;
            if (gender) employee.gender = gender;
            if (designation) employee.designation = designation;
            if (salary) employee.salary = salary;
            if (department) employee.department = department;
            if (date_of_joining) employee.date_of_joining = date_of_joining;
            if (employee_photo) employee.employee_photo = employee_photo;
    
            // save updated employee to db
            const updatedEmployee = await employee.save();
    
            // return updated employee obj
            return updatedEmployee;
    
        } catch (error) {
            // incase employee can't be updated
            throw new Error('Error, could not update employee: ' + error.message);
        }
    },

    // deleting employee by their id
    deleteEmployeeById: async ({ eid }) => {
        try {
            // finds employee based on provided id and deleted them
            const deleteEmployee = await Employee.findByIdAndDelete(eid);

            if (!deleteEmployee) {
                throw new Error('No employee matching that id was found in the database.');
            }
            // return deleted employee obj
            return `Employee with ID ${eid} has been successfully deleted.`;

        } catch (error) {
            // incase unknown error occurs during deletion
            throw new Error('An unexpected error occured and employee could not be deleted.');
        }
    }
};

module.exports = employeeResolvers;