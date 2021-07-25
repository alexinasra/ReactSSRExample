const mongoose = require('mongoose');
const sessionSchema = require('../schema/SessionSchema');

const Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;
