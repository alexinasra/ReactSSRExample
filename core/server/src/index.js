import path from 'path';

import Server from './Server.js';
/*
  * Global Variables
*/
global.isServer = true;
global.ROOT_DIR = path.resolve(__dirname, '../..');


//Application Confituration
(async () => {
  const server = new Server();

  await server.start();

})();
