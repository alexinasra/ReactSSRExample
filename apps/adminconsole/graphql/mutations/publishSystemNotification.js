
module.exports = async function (root, { input }, { req, pubSub, mongoDatabase }) {
  const collection = mongoDatabase.collection('notifications');

  const { insertedId } = await collection.insertOne({
    publisher: 'system',
    message: input
  });

  const notification = await collection.findOne({ _id: insertedId })

  pubSub.publish('NEW_NOTIFICATION',{ newNotification: notification });
  return notification;
}
