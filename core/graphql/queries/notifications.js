module.exports = async function (root, args, {
  mongoDatabase,
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
  const subscriptions = req.user.subscriptions || [];
  const collection = mongoDatabase.collection('notifications');
  const notifications = await collection.find({ publisher: { $in: ['system', ...subscriptions]}});

  return notifications.toArray();
}
