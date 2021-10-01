const { Schema } = require('mongoose');
const { Types } = Schema;

const pollOptionsSchema = new Schema({
  text: {
    type: Types.String,
    required: true,
  },
  voters: {
    type: [Types.ObjectId],
  }
});

pollOptionsSchema.virtual('votersCount').get(function () {
  return this.voters.length;
})


module.exports = pollOptionsSchema;
