const { shield, rule, and, or, allow, deny } = require('graphql-shield');

const permissions = shield({
  Query: {
    _webapp: deny
  }
});

module.exports = permissions;
