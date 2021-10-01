const Poll = require('@react-ssrex/database/models/Poll');

module.exports = async function voteOnPoll (root, { input }, { user }) {
  try {
    const poll = await Poll.findById(input.pollId);

    const option = poll.options.id(input.optionId);
    option.voters.push(user.id);
    await poll.save();

    return {
      voted: true,
      poll
    }
  } catch (e) {
    return {
      voted: false,
      error: e.message
    };
  }
}
