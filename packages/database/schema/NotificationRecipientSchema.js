const { Schema } = require('mongoose');
const { Types } = Schema;



const notificationRecipientSchema = Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  notificationId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Notification',
  },
});

notificationRecipientSchema.query.forUser = function(userId) {
  return this.where({ userId });
}
notificationRecipientSchema.query.isChecked = function(userId, notificationId) {
  return this.where({ userId, notificationId });
}
notificationRecipientSchema.statics.checkNotifications = async function(userId, notificationIds) {
  const records = await Promise.all(
    notificationIds.map(async (notificationId) => await this.create({ userId, notificationId }))
  );
  return records;
}

module.exports = notificationRecipientSchema;
