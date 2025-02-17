const bcrypt = require('bcryptjs');
const User = require('../../model/users');

const userResolvers = {

    createUser: async ({ username, email, password }) => {

        // password encryption when creating new user
        const passwordEncryption = await bcrypt.hash(password, 10);
        // creates new user with encrypted password
        const newUser = new User ({
            username,
            email,
            password: passwordEncryption
        });

        try {
            // save new user to db
            await newUser.save();
            // return new user obj + success
            return newUser;

        } catch (error) {
            // custom err message if mongodb gives err code for reusing unique email
            if (error.code === 11000) {
                throw new Error('A user with that email already exists in the database.');
            }
            // in case something goes wrong outside of unique email
            throw new Error('An unexpected error occured, new user could not be created.');
        }
    },

    
    loginUser: async ({ username, email, password }) => {
        const user = await User.findOne({
            // user can provide username OR email for login
            $or: [{ username }, { email }]
        });

        // incase match not found for provided username OR email
        if(!user) {
            throw new Error('A user with those credentials does not exist in the DB.')
        };

        // comparing entered password with encrypted password
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        // incase password doesn't pass validation
        if(!passwordMatch) {
            throw new Error('The password you entered is incorrect.')
        };

        // return user obj
        return {
            message: 'Success, that user was found!',
            user: user
        };
    }
};

module.exports = userResolvers;