

module.exports = async function setThemeName (root, { themeName }, { req, UsersDb, generateId }) {
  if(req.user) {
    const userId = req.user._id;
    const user = await UsersDb.update(generateId(userId), {
      themeSettings: {
        ...req.user.themeSettings,
        name: themeName
      }
    })
    req.session.themeSettings = user.themeSettings;
    return user.themeSettings;
  }

  req.session.themeSettings = {
    ...req.session.themeSettings,
    name: themeName
  }
  return req.session.themeSettings
}
