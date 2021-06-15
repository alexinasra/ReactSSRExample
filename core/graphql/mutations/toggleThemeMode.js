

module.exports = async function toggleThemeMode(root, args, { req, UsersDb, generateId }) {
  if(req.user) {
    const userId = req.user._id;
    const themeMode = req.user.themeSettings.mode !== 'light'? 'light' : 'dark';
    const user = await UsersDb.update(generateId(userId), {
      themeSettings: {
        ...req.user.themeSettings,
        mode: themeMode
      }
    })
    req.session.themeSettings = user.themeSettings;
    return user.themeSettings;
  }

  req.session.themeSettings = {
    ...req.session.themeSettings,
    mode: req.session.themeSettings.mode !== 'light'? 'light' : 'dark'
  };
  return req.session.themeSettings;
}
