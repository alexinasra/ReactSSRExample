
module.exports = {
  Mutation: {
    editUserProfile(root, { userId, editForm }, { req }) {
      req.user = { ...req.user, ...editForm }
      return req.user;
    }
  }
}
