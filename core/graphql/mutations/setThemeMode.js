

module.exports = async function setThemeMode(root, { themeMode }, { req: { user } }) {
  if(user) {
    user.themeSettings.mode = themeMode;
    await user.save();
    return user.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  }
}
