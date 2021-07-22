module.exports = async function changePassword(root, { input: { oldPassword, newPassword } }, { req: { user } }) {
  if (!user) {
    return { error: 'UnauthenticatedUser' };
  }

  try {
    if(!await user.validatePassword(oldPassword)) {
      return {
        error: 'IncorrectPassword'
      };
    }
    await user.setPassword(newPassword);
    user.save();

    return {
      error : null
    };
  } catch (e) {
    return {
      error: 'ServerError',
    };
  }
}
