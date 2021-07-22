const Notification = require('@react-ssrex/database/models/Notification');

module.exports = async function systemNotifications (root, args) {
  const notifications = await Notification.find().byPublisher('system').exec();
  return notifications;
}
