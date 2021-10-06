const Poll = require('@react-ssrex/database/models/Poll');


module.exports = async function translatePoll({
  input: {
    pollId,
    language,
    subject,
    options
  }
}) {
  try {
    const poll = await Poll.findById(pollId);

    if(!poll) {
      return {
        translated: false,
        error: "poll not found"
      };
    }
    poll.setLanguage(language);
    poll.subject = subject;
    options.forEach(o => {
      const option = poll.options.id(o.optionId)
      option.setLanguage(language);
      option.text = o.text;
    });
    await poll.save()

    return {
      translated: true,
      poll,
    }
  } catch (e) {
    return {
      translated: false,
      error: e.getMessage()
    }
  }
}
