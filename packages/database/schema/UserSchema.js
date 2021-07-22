const {
  DbLoginBadPasswordError,
  DbLoginUserNotFoundError ,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError,
} = require('@react-ssrex/database/DbError');

const { Schema } = require('mongoose');
const { Types } = Schema;
const bcrypt = require('bcrypt');
const { text } = require('@react-ssrex/utils');

function simplePasswordHash(password) {
  return bcrypt.hash(password, 14);
}

function simplePasswordCompare(password, hash) {
  return bcrypt.compare(password, hash);
}

const userSchema = new Schema({
  email: {
    type: Types.String,
    unique: true,
  },
  firstname: {
    type: Types.String,
    required: true,
  },
  lastname: {
    type: Types.String,
    required: true,
  },
  hash: {
    type: Types.String,
    required: true,
  },
  activationCode:{
    type: Types.String,
    default: text.generateString(6)
  },
  activated: {
    type: Types.Boolean,
    default: false,
  },
  profilePicture: Types.String,
  preferedLanguage: Types.String,
  themeSettings: {
    name: Types.String,
    mode: Types.String
  },
});

userSchema.query.byEmail = function(email) {
  return this.where({ email })
}
userSchema.methods.validatePassword = async function (password) {
  return simplePasswordCompare(password, this.hash);
}
userSchema.methods.setPassword = async function(plainText) {
  this.hash = await simplePasswordHash(plainText);
}
userSchema.statics.emailSignin = async function(email, password, req) {
  const user = await this.findOne().byEmail(email).exec();
  if(!user) {
    throw new DbLoginUserNotFoundError(email);
    return null;
  }
  if (!await user.validatePassword(password)) {
    throw new DbLoginBadPasswordError(email, 0);
    return null;
  }

  return user;
}

module.exports = userSchema;
