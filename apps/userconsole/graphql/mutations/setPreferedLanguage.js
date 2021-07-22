
module.exports = async function setPreferedLanguage(root, { lng }, { req: { user } }) {
  user.preferedLanguage = lng
  await user.save();
  
  return user;
};
