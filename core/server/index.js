const fs = require('fs');
const path = require('path');

let args = {};


function isProduction() {
  if (!!!args.profile) {
    args.profile = process.env.NODE_ENV;
  }
  return (args.profile.toUpperCase() === "DEVELOPMENT")
}

function isDevelopment() {
  return !isProduction();
}

function start(user_args) {
  args = user_args;

  if (isProduction) {
    if (fs.existsSync(path.join(__dirname, 'build', 'server.js'))) {

    }
  }
}




module.exports = {
  start,
}
