const bcrypt = require('bcryptjs');
const User = require('../../model/users');

// user query for login authentication
const userQueries = {
    // _ not using parent
    loginUser: async (_, { username, email, password }) => {
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

module.exports = userQueries;