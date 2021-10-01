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
    required: true
  },
  options: {
    type: [pollOptionsSchema],
    required: true
  }
});

pollSchema.virtual('votersCount').get(function () {
  return this.options.reduce((acc, o) => acc + o.votersCount, 0);
});


module.exports = pollSchema;
