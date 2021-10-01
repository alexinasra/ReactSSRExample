const Poll = require('@react-ssrex/database/models/Poll');

module.exports = async function createPoll(root, { input: { subject, options } }, { user }) {
  try {
    const poll = await Poll.create({
      userId: user.id,
      subject,
      options: options.map(o => ({ text: o, voters: []}))
    });
    return {
      created: true,
      poll
    };
  } catch(e) {
    return {
      created: false,
      error: e.message
    };
  }
}
