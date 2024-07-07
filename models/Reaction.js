const { Schema, Types } = require('mongoose');

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

function dateFormat(date) {
    const dateFormatted = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ';

    const timeFormatted = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return dateFormatted + `at ` + timeFormatted;
}

module.exports = reactionSchema;
