const { Schema } = require('mongoose');
const { Types } = Schema;
const pollOptionsSchema = require('./PollOptionSchema')
const pollSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  subject: {
    type: Types.String,
    required: true,
    i18n: true
  },
  options: {
    type: [pollOptionsSchema],
    required: true
  },
  approved: {
    type: Types.Boolean,
    default: false
  }
});

pollSchema.virtual('votersCount').get(function () {
  return this.options.reduce((acc, o) => acc + o.votersCount, 0);
});


module.exports = pollSchema;
