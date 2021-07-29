const { Schema } = require('mongoose');
const { Types } = Schema;

const sessionSchema = new Schema({

  ip: {
    type: Types.String,
    required: true,
  },
  userAgent: {
    type: Types.String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  signinAttempts: {
    type: Types.Number,
    default: 0
  },
  themeSettings: {
    name: {
      type: Types.String,
      default: 'default'
    },
    mode: {
      type: Types.String,
      default: 'light',
    }
  },
});


module.exports = sessionSchema;
