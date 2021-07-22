

module.exports = async function toggleThemeMode(root, args, { req: { user } }) {
  if(user) {
    const themeMode = user.themeSettings.mode !== 'light'? 'light' : 'dark';
    user.themeSettings.mode = themeMode;
    await user.save();
    return user.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  };
}
