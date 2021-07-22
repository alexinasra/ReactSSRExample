const { Schema } = require('mongoose');
const { Types } = Schema;


const notificationSchema = new Schema({
  publisher: {
    type: Types.String,
    required: true,
  },
  message: {
    type: Types.String,
    required: true,
  },
  for: {
    type: [Types.ObjectId],
    required: true
  },
  checked: {
    type: Types.Boolean,
    default: false,
  }
});


notificationSchema.query.forUser = function (userId) {
  return this.where({ for: userId});
}
notificationSchema.query.byPublisher = function (publisher) {
  return this.where({ publisher });
}

module.exports = notificationSchema;
