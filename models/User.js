const { Schema, model } = require('mongoose');

const validator = require('validator');

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
            validate: [ validator.isEmail, 'Invalid email format.' ],
        },
        thoughts: [{
                type: Schema.Types.ObjectId,
                ref: 'thought',
        }],
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

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// Initialize the User model based on the userSchema
const User = model('user', userSchema);

module.exports = User;
