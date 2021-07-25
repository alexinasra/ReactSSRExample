

module.exports = async function setThemeName (root, { themeName }, { session }) {
  if(session) {
    session.themeSettings.name = themeName;
    await session.save();
    return session.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  }
}
