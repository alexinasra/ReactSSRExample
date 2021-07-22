const { Schema, Types } = require('mongoose');


const notificationPublisherSchema = new Schema({
  user: {
    type: Types:ObjectId,
    required: true,
  },
  subject: {
    type: Types.String,
    required: true,
  }
});
