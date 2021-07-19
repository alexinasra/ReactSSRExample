

module.exports = async function setThemeName (root, { themeName }, { req, UsersDb, generateId }) {
  if(req.user) {
    const userId = req.user._id;
    const user = await UsersDb.update(generateId(userId), {
      themeSettings: {
        ...req.user.themeSettings,
        name: themeName
      }
    })
    return user.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  }
}
