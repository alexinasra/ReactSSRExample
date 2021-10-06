const Poll = require('@react-ssrex/database/models/Poll');

module.exports = async function fetchPolls (root, {
  filter: {
    queryText,
    show = "all"
  }
}) {
  const queryObj = {};

  if(show == 'approved') {
    queryObj.approved = true
  } else if(show == '!approved') {
    queryObj.approved = false
  }

  return await Poll.find(queryObj);
}
