const Notification = require('@react-ssrex/database/models/Notification');
const NotificationRecipient = require('@react-ssrex/database/models/NotificationRecipient');

module.exports = async function (root, { notificationIds }, { req  }) {
  await NotificationRecipient.checkNotifications(req.user._id, notificationIds);
  const notifications = await Notification.find().where({ _id: { $in: notificationIds}}).exec();
  return {
    checked: notifications
  };
}
