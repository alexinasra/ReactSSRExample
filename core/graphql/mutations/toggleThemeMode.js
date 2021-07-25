

module.exports = async function toggleThemeMode(root, args, { session }) {
  if(session) {
    const themeMode = session.themeSettings.mode !== 'light'? 'light' : 'dark';
    session.themeSettings.mode = themeMode;
    await session.save();
    return session.themeSettings;
  }

  return {
    name: 'default',
    mode: 'light'
  };
}
