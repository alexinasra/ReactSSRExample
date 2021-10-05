require('graphql-import-node');
const {
  ObjectId
} = require('mongodb');
const {
  createApplication,
  createModule
} = require('graphql-modules');
const {
  graphqlHTTP
} = require('express-graphql');
const {
  ApolloServer,
} = require('apollo-server-express');
const {
  SubscriptionServer
} = require('subscriptions-transport-ws');
const rootSchema = require('./schema.graphql');
const resolvers = require('./resolvers');
const rootPermissions = require('./permissions');
const authPermissions = require('@react-ssrex/auth/graphql/permissions');
const userConsolePermissions = require('@react-ssrex/userconsole/graphql/permissions');
const adminConsolePermissions = require('@react-ssrex/adminconsole/graphql/permissions');
const webappPermissions = require('@react-ssrex/webapp/graphql/permissions');

const useragent = require('express-useragent');
const { applyMiddleware } = require('graphql-middleware');

const {
  execute,
  subscribe
} = require('graphql');

const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');


module.exports = async function setup({
  app,
  server,
  passport,
  pubSub,
  options,
}) {
  const contextFn = async (c) => {
    const { user, session } = await new Promise(function(resolve, reject) {
      passport.authenticate(
        'jwt-token',
        { session: false },
        (err, data, info) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        }
      )(c.req);
    });

    const ip = c.req.headers['x-forwarded-for'] ||
         c.req.socket.remoteAddress ||
         null;
    const ua = c.req.headers['user-agent'];
    const uaObj = useragent.parse(ua);

    c.req.useragent = uaObj;
    c.req.userip = ip;

    // TODO: make security check to validate the user identity (with ip to country or geo location, useragent or by othe means).

    if(user) {
      // TODO: figure out how to manage session and track online users.
      // one solution is to periodically check for users lastAccess.
      user.lastAccess = Date.now();
      await user.save();
      c.req.user = user;
    }

    return {
      ...c,
      session,
      user,
      ip,
      userAgent: uaObj,
      userAgentSource: ua,
      pubSub,
      generateId: (idStr) => new ObjectId(idStr),
    };
  };

  const rootModule = createModule({
    id: 'root',
    typeDefs: rootSchema,
    resolvers: resolvers,
  });

  const i18nModule = createModule({
    id: 'i18n',
    typeDefs: require('@react-ssrex/i18n/graphql/schema.graphql'),
    resolvers: require('@react-ssrex/i18n/graphql/resolvers'),
  });

  const authModule = createModule({
    id: 'auth',
    typeDefs: require('@react-ssrex/auth/graphql/schema.graphql'),
    resolvers: require('@react-ssrex/auth/graphql/resolvers'),
  });
  const adminConsoleModule = createModule({
    id: 'adminconsole',
    typeDefs: require('@react-ssrex/adminconsole/graphql/schema.graphql'),
    resolvers: require('@react-ssrex/adminconsole/graphql/resolvers'),
  });
  const userConsoleModule = createModule({
    id: 'userconsole',
    typeDefs: require('@react-ssrex/userconsole/graphql/schema.graphql'),
    resolvers: require('@react-ssrex/userconsole/graphql/resolvers'),
  });
  const webappModule = createModule({
    id: 'webapp',
    typeDefs: require('@react-ssrex/webapp/graphql/schema.graphql'),
    resolvers: require('@react-ssrex/webapp/graphql/resolvers'),
  });


  const modules = [rootModule, i18nModule, authModule];
  const permissions = [rootPermissions, authPermissions];
  if (options.qlServer || !options.disableAdmin) {
    modules.push(adminConsoleModule);
    permissions.push(adminConsolePermissions);
  }
  if (options.qlServer || !options.disableUser) {
    modules.push(userConsoleModule);
    permissions.push(userConsolePermissions);
  }
  if (options.qlServer || !options.disableWebapp) {
    modules.push(webappModule);
    permissions.push(webappPermissions);
  }

  const qlAppEndpoint = await createApplication({
    modules
  })
  const qlSchema = applyMiddleware(
    qlAppEndpoint.createSchemaForApollo(),
    ...permissions
  )
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    keepAlive: 1200,
    schema: qlSchema,
    onConnect: (params, socket, context) => {
      const req = socket.upgradeReq
      req.headers.authorization = params.Authorization;
      return contextFn({
        ...context,
        req
      })
    }
  }, {
    server,
    path: '/subscriptions',
  });



  const qlServer = new ApolloServer({
    schema: qlSchema,
    context: contextFn,
    subscriptions: {
      path: '/subscriptions',
    },
    uploads: {
      maxFileSize: 10000000,
      maxFiles: 20
    },
  });
  await qlServer.start();
  qlServer.applyMiddleware({
    app,
    path: '/graphql'
  });
};
