

module.exports = async function setThemeMode(root, { themeMode }, { req, UsersDb, generateId }) {
  if(req.user) {
    const userId = req.user._id;
    const user = await UsersDb.update(generateId(userId), {
      themeSettings: {
        ...req.user.themeSettings,
        mode: themeMode
      }
    });
    req.session.themeSettings = user.themeSettings;
    return user.themeSettings;
  }

  req.session.themeSettings = {
    ...req.session.themeSettings,
    mode: themeMode
  }
  return req.session.themeSettings
}
