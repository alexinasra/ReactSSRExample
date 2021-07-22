const User = require('@react-ssrex/database/models/User');
const Notification = require('@react-ssrex/database/models/Notification');

module.exports = async function (root, { input }, { req, pubSub }) {
  const users = await User.find({}).exec();
  const notification = await Notification.create({
    publisher: 'system',
    message: input,
    for: users.map(u => u._id),
  })
  pubSub.publish('NEW_NOTIFICATION', { notification });
  return notification;
}
