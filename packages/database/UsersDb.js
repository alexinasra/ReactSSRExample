const EventEmitter = require('events');
const bcrypt = require('bcrypt');
const { text } = require('@react-ssrex/utils');
const errors = require('./DbError');
const ObjectId = require('mongodb').ObjectId;

function simplePasswordHash(password) {
  return bcrypt.hash(password, 14);
}

function simplePasswordCompare(password, hash) {
  return bcrypt.compare(password, hash);
}


class UsersDb {
  constructor(database) {
    this.database = database;
    this.collection = database.collection('users');
  }

  static with(database) {
    return new UsersDb(database);
  }

  create = async (user, email, password) => {
    const hash = await simplePasswordHash(password);
    const result = await this.collection.insertOne({
      ...user,
      email,
      activationCode: text.generateString(6),
      activated: false,
      hash,
      // default values
      // ...
    });

    return result.ops[0];
  }

  login = async (email, password, attempt = 0) => {
    const user = await this.collection.findOne({ email });
    if (user) {
      const success = await simplePasswordCompare(password, user.hash);
      if (success) {
        //login success.
        delete user.hash;
        return {
          user
        }
      } else {
        throw new errors.DbLoginBadPasswordError(email, attempt);
      }
    } else {
      //user not found
      throw new errors.DbLoginUserNotFoundError(email);
    }
  }
  changePassword = async (userId, password, newPassword, attempt = 0) => {
    if(typeof userId === "string") {
      userId = new ObjectId(userId);
    }
    const user = await this.collection.findOne({ _id: userId });
    if (user) {
      const success = await simplePasswordCompare(password, user.hash);
      if (success) {
        const hash = await simplePasswordHash(newPassword);
        this.update(userId, { hash })

        delete user.hash;
        return {
          user
        }
      } else {
        throw new errors.DbChangePasswordBadPasswordError(userId, attempt);
      }
    } else {
      //user not found
      throw new errors.DbChangePasswordUserNotFoundError(userId);
    }

  }
  update = async (userId, batch) => {
    if(typeof userId === "string") {
      userId = new ObjectId(userId);
    }
    const result = await this.collection.findOneAndUpdate({ _id:  userId }, { '$set': batch });
    const user = await this.collection.findOne({ _id:  userId });
    return user;
  }

  getUsers = async () => {
    const result = await this.collection.find();
    return result.toArray();
  }

  get = async (userId) => {
    if(typeof userId === "string") {
      userId = new ObjectId(userId);
    }
    const user = await this.collection.findOne({ _id:  userId });

    delete user.hash;
    return user;
  }
}

module.exports = UsersDb;
