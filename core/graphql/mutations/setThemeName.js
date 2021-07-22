

module.exports = async function setThemeName (root, { themeName }, { req: { user } }) {
  if(user) {
    user.themeSettings.name = themeName;
    await user.save();
    return user.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  }
}
