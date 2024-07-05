const { Schema, model } = require('mongoose');

const validator = require('validator');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [ validator.isEmail, 'invalid email' ]
        },
        // thoughts: {
        // TODO: Should be an array of _id values referencing the Thought model
        // },
        // friends: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'user',
        //     }
        // ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// userSchema
//     .virtual('friendCount')
//     .get(function () {
//         return this.friends.length;
//     });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
