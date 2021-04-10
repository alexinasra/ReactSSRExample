class DbError extends Error {
  constructor(message) {
    super(message);
   // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
   // This clips the constructor invocation from the stack trace.
   // It's not absolutely essential, but it does make the stack trace a little nicer.
   //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor);
  }
}

class DbLoginUserNotFoundError extends DbError {
  constructor(email) {
    super(`email ${email} not found.`)
    this.data = {
      email
    }
  }
}
class DbLoginBadPasswordError extends DbError {
  constructor(email, attempt = 0) {
    super(`incorrect password for ${email}, attempt (${attempt}).`)
    this.data = {
      email,
      attempt
    }
  }
}
class DbChangePasswordBadPasswordError extends DbError {
  constructor(userId, attempt = 0) {
    super(`incorrect password for ${userId}, attempt (${attempt}).`)
    this.data = {
      userId,
      attempt
    }
  }
}
class DbChangePasswordUserNotFoundError extends DbError {
  constructor(userId) {
    super(`user with id ${userId} not found.`)
    this.data = {
      userId,
      attempt
    }
  }
}


module.exports = {
  DbError,
  DbLoginUserNotFoundError,
  DbLoginBadPasswordError,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError
}
