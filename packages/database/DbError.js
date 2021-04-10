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
    super(`incurrect password for ${email}, attempt (${attempt}).`)
    this.data = {
      email,
      attempt
    }
  }
}


module.exports = {
  DbError,
  DbLoginUserNotFoundError,
  DbLoginBadPasswordError,
}
