const bcrypt = require('bcryptjs');
const User = require('../../model/users');

const userMutations = {
    createUser: async (_, { username, email, password }) => {
        // password encryption when creating new user
        const passwordEncryption = await bcrypt.hash(password, 10);

        // creates new user with encrypted password
        const newUser = new User ({
            username,
            email,
            password: passwordEncryption
        });

        // using try/catch for better error handling, but my mongodb is already enforcing unique email in db
        try {
            // save new user to db
            await newUser.save();
        } catch (error) {
            // custom err message if mongodb gives err code for reusing unique email
            if (error.code === 11000) {
                throw new Error('A user with that email already exists in the database.');
            }
            // in case something goes wrong outside of unique email
            throw new Error('An unexpected error occured, new user could not be created.');
        };

        // return new user obj + success message
        return {
            message: 'New user was created successfully!',
            user: newUser
        };
    }
};

module.exports = userMutations;