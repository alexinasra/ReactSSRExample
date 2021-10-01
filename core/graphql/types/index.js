const {
  GraphQLUpload
} = require('graphql-modules');



module.exports = {
  Upload: GraphQLUpload,
  User: require('./User'),
  Notification: require('./Notification'),
  Poll: require('./Poll')
}
