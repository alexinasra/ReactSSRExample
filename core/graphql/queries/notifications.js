const Notification = require('@react-ssrex/database/models/Notification');

module.exports = async function (root, args, {
  user
}) {
  if (!user) {
    return [
      {
        _id: 'wellcome1',
        publisher: 'system',
        message: 'Wellcome',
        checked: false
      },
      {
        _id: 'wellcome2',
        publisher: 'system',
        message: 'Signup',
        checked: false
      }
    ]
  }

  const notifications = await Notification.getUnchecked(user._id);
  console.log(notifications)
  return notifications;
}
