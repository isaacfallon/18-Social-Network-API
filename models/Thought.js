// Extract the Schema and Types properties from the imported mongoose module
const { Schema, model } = require('mongoose');

// Import the reactions schema so we can save it as an array of nested documents in the thoughtSchema below
const Reaction = require('./Reaction');

// Schema for thought data
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
            // Getter to call a function to format our date and time
            get: dateFormat,
        },
        username: {
            type: String,
            required: true,
            ref: 'user',
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Function to format our date and time when a reaction is posted. 
//The date is passed into the function and formatted within. The formatted date and time and then returned.
function dateFormat(date) {
    const dateFormatted = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ';

    const timeFormatted = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return dateFormatted + `at ` + timeFormatted;
}

// A virtual is created to count all reactions (length of thought's reactions array)
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Initialize our User model based on the thoughtSchema
const Thought = model('thought', thoughtSchema);

// Export the User model
module.exports = Thought;
