// Extract the Schema and Types properties from the imported mongoose module
const { Schema, Types } = require('mongoose');

// Schema for reaction data
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
        type: String,
        required: true,
        ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter to call a function to format our date and time
      get: dateFormat,
    },
  },
  {
    toJSON: {
      getters: true,
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

// Export the reactionSchema to be imported into the Thought model
module.exports = reactionSchema;
