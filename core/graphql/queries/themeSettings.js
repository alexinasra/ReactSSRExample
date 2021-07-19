module.exports = function themeSettings (root, args, { req }) {
  if(!req.user || (req.user && !req.user.themeSettings)) {
    return {
      name: 'default',
      mode: 'light'
    };
  }
  return req.user.themeSettings;
}
