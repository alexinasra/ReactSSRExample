const Notification = require('@react-ssrex/database/models/Notification');

module.exports = async function (root, args, {
  req
}) {
  if (!req.user) {
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

  const notifications = Notification.find().forUser(req.user._id);
  return notifications;
}
