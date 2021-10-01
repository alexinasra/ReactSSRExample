const Poll = require('@react-ssrex/database/models/Poll');

module.exports = async function (root, { pollId }) {
  return await Poll.findById(pollId);
}
