const path = require('path');
const Server = require('./Server');
const { program } = require('commander');

// Applications
const attachAuth = require('@react-ssrex/auth');
const attachAdminConsole = require('@react-ssrex/adminconsole');
const attachUserConsole = require('@react-ssrex/userconsole');
const attachWebApp = require('@react-ssrex/webapp');
const pkg = require('../package');

/*
  * Global Variables
*/
global.isServer = true;
global.ROOT_DIR = path.resolve(__dirname, '../..');

function collect(value, previous) {
  return previous.concat([value]);
}

program.version(pkg.version);
program.option('--disable-auth', 'disable auth');
program.option('--disable-admin', 'disable adminconsole');
program.option('--disable-user', 'disable userconsole');
program.option('--disable-webapp', 'disable webapp');

program.parse(process.argv);
//Application Confituration
(async () => {
  const modules = [];
  const options = program.opts();

  if(!options.disableAuth) {
    modules.push('@react-ssrex/auth')
  }
  if(!options.disableAdmin) {
    modules.push('@react-ssrex/adminconsole')
  }
  if(!options.disableUser) {
    modules.push('@react-ssrex/userconsole')
  }
  if(!options.disableWebapp) {
    modules.push('@react-ssrex/webapp')
  }
  const server = new Server(modules);
  try {
    await server.start();
  } catch(e) {
    console.error(e);
  }
})();
