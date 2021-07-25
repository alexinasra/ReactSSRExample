const { rule } = require('graphql-shield');


module.exports = {
  isAuthenticated: rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      return !!ctx.session;
    },
  ),
  isGuest: rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      return !ctx.user && !!ctx.session;
    },
  ),
  isUser: rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      return !!ctx.user && !!ctx.session;
    },
  ),
}
