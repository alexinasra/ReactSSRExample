
  module.exports = async function setPreferedLanguage(root, { lng }, { req, UsersDb }) {
    const userId = req.user._id;
    const user = await UsersDb.update(userId, {
      preferedLanguage: lng
    });
    return user;
  };
