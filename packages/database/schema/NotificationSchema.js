const { Schema } = require('mongoose');
const { Types } = Schema;
const NotificationRecipient = require('../models/NotificationRecipient')


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
    required: true,
    ref: 'User'
  },
  checked: {
    type: Types.Boolean,
    default: false,
  }
});


notificationSchema.query.forUser = function (userId) {
  return this.where({ for: userId });
}
notificationSchema.query.byPublisher = function (publisher) {
  return this.where({ publisher });
}
notificationSchema.statics.getUnchecked = async function (userId) {
  const r = await NotificationRecipient.find().forUser(userId).exec();
  const checkedId = r.map(o => o.notificationId);
  return await this.find().where({ for: userId }).and({ _id: { $nin: checkedId } }).exec();
}
module.exports = notificationSchema;
