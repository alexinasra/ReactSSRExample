const { rule } = require('graphql-shield');


module.exports = {
  isGuest: rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      return !ctx.user;
    },
  ),
  isAuthenticated: rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      return !!ctx.user;
    },
  ),
}
