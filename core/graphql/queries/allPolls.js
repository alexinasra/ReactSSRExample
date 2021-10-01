const Poll = require('@react-ssrex/database/models/Poll');

module.exports = async function allPols () {
  return await Poll.find({});
}
