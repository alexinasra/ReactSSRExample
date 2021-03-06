const Poll = require('@react-ssrex/database/models/Poll');

module.exports = {
  myVote: async ({ id, options }, args, { user }) => {
    if(!user) {
      return null
    }
    try {
      const option = options.find(o => o.voters.includes(user.id));
      return option;
    } catch(e) {
      console.log(e);
      return null;
    }
  },
  language: (root) => root.getLanguage()
}
