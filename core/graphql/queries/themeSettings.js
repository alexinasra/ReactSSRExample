module.exports = function themeSettings (root, args, { req }) {
  if(req.user) {
    req.session.themeSettings = req.user.themeSettings;
  }
  if(!req.session.themeSettings) {
    req.session.themeSettings = {
      name: 'default',
      mode: 'light'
    };
  }
  return req.session.themeSettings;
}
