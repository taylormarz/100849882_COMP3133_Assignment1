const Employee = require('../../model/employees');

const employeeMutations = {
    // create new employee in db
    createNewEmployee: async (_, { first_name, last_name, email, gender, designation, salary, department, employee_photo }) => {
        // new employee obj
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            gender,
            designation,
            salary,
            department,
            employee_photo
        });

        try {
            // save new employee to db
            await newEmployee.save();
            // return new employee obj
            return newEmployee;

        } catch (error) {
            // error incase new employee can't be created
            throw new Error('Error, could not create new employee.');
        }
    },

    // update employee by their id
    updateEmployeeById: async (_, { id, first_name, last_name, email, gender, designation, salary, department, employee_photo }) => {
        try {
            // find the employee by their id and update whichever fields
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id, 
                // fields that can be updated
                { first_name, last_name, email, gender, designation, salary, department, employee_photo },
                // returns UPDATED employee
                { new: true }
            );

            // incase no employee with matching id exists in db
            if (!updatedEmployee) {
                throw new Error('No employee matching that id was found in the database.');
            }
            // return updated employee obj
            return updatedEmployee;

        } catch (error) {
            // incase unknown error occurs during update
            throw new Error('An unexpected error occured and employee could not be updated.');
        }
    },

    // deleting employee by their id
    deleteEmployeeById: async (_, { id }) => {
        try {
            // finds employee based on provided id and deleted them
            const deleteEmployee = await Employee.findByIdAndDelete(id);

            if (!deleteEmployee) {
                throw new Error('No employee matching that id was found in the database.');
            }
            // return deleted employee obj
            return deleteEmployee;

        } catch (error) {
            // incase unknown error occurs during deletion
            throw new Error('An unexpected error occured and employee could not be deleted.');
        }
    }
};

module.exports = employeeMutations;