const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    username:   { type: String, require: true },
    email:      { type: String, require: true, unique: true },
    password:   { type: String, require: true },
},
{
    // using timestamp to create these fields and autoupdate them
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;