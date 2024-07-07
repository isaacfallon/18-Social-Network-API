// Extract the Schema and Types properties from the imported mongoose module
const { Schema, model } = require('mongoose');

// The validator npm package is imported so we can validate the email input
const validator = require('validator');

// Schema for user data
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Here we call the validator npm package using 'validator.isEmail' 
            // to check the email input is valid. If it's not valid, we get a message saying so.
            validate: [ validator.isEmail, 'Invalid email format.' ],
        },
        // The thoughts model is referenced so we can display the user's thoughts as an array of _id values.
        thoughts: [{
                type: Schema.Types.ObjectId,
                ref: 'thought',
        }],
        // The user model is self-referenced so we can display the user's friends as an array of _id values.
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// A virtual is created to count all friends for a user (length of friends array)
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// Initialize the User model based on the userSchema
const User = model('user', userSchema);

// Export our User model
module.exports = User;
