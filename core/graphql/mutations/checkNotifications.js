module.exports = async function (root, { notificationIds }, { req, mongoDatabase, generateId }) {
  const collection = mongoDatabase.collection('notification_recipients');
  const notificationsCollection = mongoDatabase.collection('notifications');
  const user = req.user;

  const notifications = await Promise.all(await notificationIds.map(async (notificationId) => {
    let result =  await collection.findOne({
      $and: [
        { notificationId: generateId(notificationId) },
        { userId: user._id },
      ]
    });

    if (result) {
      return result;
    }

    result = await collection.insertOne({
      notificationId: generateId(notificationId),
      userId: user._id
    });


    return await notificationsCollection.findOne({ _id: generateId(notificationId) })
  }));

  return {
    checked: notifications
  };
}
