const mongoose = require('mongoose');
const notificationSchema = require('../schema/NotificationSchema');

const Notification = mongoose.model('Notification', notificationSchema, 'notifications');

module.exports = Notification;
