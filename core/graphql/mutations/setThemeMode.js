

module.exports = async function setThemeMode(root, { themeMode }, { session }) {
  if(session) {
    session.themeSettings.mode = themeMode;
    await session.save();
    return session.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  }
}
