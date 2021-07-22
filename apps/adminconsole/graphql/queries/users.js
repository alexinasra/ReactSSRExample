const User = require('@react-ssrex/database/models/User');

module.exports = async function users () {
  const users = await User.find({}).exec();
  return users;
}
