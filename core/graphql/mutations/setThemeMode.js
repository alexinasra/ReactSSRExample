

module.exports = async function setThemeMode(root, { themeMode }, { req, UsersDb, generateId }) {
  if(req.user) {
    const userId = req.user._id;
    const user = await UsersDb.update(generateId(userId), {
      themeSettings: {
        ...req.user.themeSettings,
        mode: themeMode
      }
    });
    return user.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  }
}
