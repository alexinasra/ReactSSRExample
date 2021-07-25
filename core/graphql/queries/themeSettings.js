module.exports = function themeSettings (root, args, { session }) {
  if(!session || (!session && !session.themeSettings)) {
    return {
      name: 'default',
      mode: 'light'
    };
  }
  return session.themeSettings;
}
