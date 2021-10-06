const Poll = require('@react-ssrex/database/models/Poll');


module.exports = async function approvePoll(root, {
  pollId
}) {
  try {
    const poll = await Poll.findById(pollId);

    if(!poll) {
      return {
        approved: false,
        error: "poll not found"
      };
    }
    poll.approved = true;

    await poll.save()
    return {
      approved: true,
      poll,
    }
  } catch (e) {
    return {
      approved: false,
      error: e.message
    }
  }
}
