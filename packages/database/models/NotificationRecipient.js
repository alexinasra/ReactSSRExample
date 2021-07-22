const mongoose = require('mongoose');
const notificationRecipientSchema = require('../schema/NotificationRecipientSchema');

const NotificationRecipient = mongoose.model('NotificationRecipient', notificationRecipientSchema, 'notification_recipients');

module.exports = NotificationRecipient;
