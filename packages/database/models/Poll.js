const mongoose = require('mongoose');
const pollSchema = require('../schema/PollSchema');

const Poll = mongoose.model('Poll', pollSchema, 'polls');

module.exports = Poll;
