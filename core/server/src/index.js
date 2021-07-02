const path = require('path');
const Server = require('./Server');


// Applications
const attachAuth = require('@react-ssrex/auth');
const attachAdminConsole = require('@react-ssrex/adminconsole');
const attachUserConsole = require('@react-ssrex/userconsole');
const attachWebApp = require('@react-ssrex/webapp');

/*
  * Global Variables
*/
global.isServer = true;
global.ROOT_DIR = path.resolve(__dirname, '../..');


//Application Confituration
(async () => {
  const server = new Server([
    '@react-ssrex/auth',
    '@react-ssrex/adminconsole',
    '@react-ssrex/userconsole',
    '@react-ssrex/webapp',
  ]);
  try {
    await server.start();
  } catch(e) {
    console.error(e);
  }
})();
