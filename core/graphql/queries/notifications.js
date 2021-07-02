module.exports = async function (root, args, {
  mongoDatabase,
  req
}) {
  const subscriptions = req.user.subscriptions || [];
  const collection = mongoDatabase.collection('notifications');
  const notifications = await collection.find({ publisher: { $in: ['system', ...subscriptions]}});

  return notifications.toArray();
}
