const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat,
        },
        username: {
            type: String,
            required: true,
            ref: 'user',
        },
        // reactions: {
        // TODO: Add reactions properties here once the reactions schema has been set up
        // }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

function dateFormat(date) {
    const dateFormatted = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ';

    const timeFormatted = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return dateFormatted + `at ` + timeFormatted;
}

// thoughtSchema
//     .virtual('reactionCount')
//     .get(function () {
//         return this.friends.length;
//     });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
