const NotificationRecipient = require('@react-ssrex/database/models/NotificationRecipient');

module.exports = {
  id: (root) => root['_id'],
  checked: async (root, args, {
    req,
    mongoDatabase,
    UsersDb,
    ...rest
  }) => {
    if (!req.user) {
      return false
    }

    const result = await NotificationRecipient.findOne().isChecked(req.user._id, root._id)
    return !!result;
  }
};
