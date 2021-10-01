const {
  withFilter
} = require('graphql-subscriptions');


module.exports = {
  resolve: ({ notification }) => (notification),
  subscribe: (root, args, ctx) => withFilter(
    () => ctx.pubSub.asyncIterator(['NEW_NOTIFICATION']),
    ({notification}) => notification.for.find(id => ctx.req.user._id.equals(id)) !== undefined
  )(root, args, ctx)
};
