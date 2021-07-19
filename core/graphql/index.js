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
const DbError = require('@react-ssrex/database/DbError');
const UsersDb = require('@react-ssrex/database/UsersDb');

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
  mongoClient,
  mongoDatabase,
  UsersDb
}) {

  const contextFn = async (c) => {
    const user = await new Promise(function(resolve, reject) {
      passport.authenticate(
        'jwt-token',
        { session: false },
        (err, user, info) => {
          if (err) {
            return reject(err);
          }
          resolve(user);
        }
      )(c.req);
    });
    c.req.user = user;

    return {
      ...c,
      pubSub,
      mongoClient,
      mongoDatabase,
      UsersDb,
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


  const wsApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, userConsoleModule, webappModule, adminConsoleModule]
  });

  const wsSchema = wsApp.createSchemaForApollo();
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    keepAlive: 1200,
    schema: wsSchema,
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
  const authApp = await createApplication({
    modules: [rootModule, i18nModule, authModule]
  })

  const authSchema = authApp.createSchemaForApollo();
  const authQlServer = new ApolloServer({
    schema: authSchema,
    context: contextFn,
    subscriptions: {
      path: '/subscriptions',
    },
    // playground: false,
    uploads: {
      maxFileSize: 10000000,
      maxFiles: 20
    },
  });
  await authQlServer.start();
  authQlServer.applyMiddleware({
    app,
    path: '/authql'
  });

  const adminConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, adminConsoleModule]
  })
  const adminConsoleSchema = await adminConsoleApp.createSchemaForApollo();


  const adminQLServer = new ApolloServer({
    schema: adminConsoleSchema,
    context: contextFn,
    subscriptions: {
      path: '/subscriptions',
    },
    // playground: false,
    uploads: {
      maxFileSize: 10000000,
      maxFiles: 20
    },
  });
  await adminQLServer.start();
  adminQLServer.applyMiddleware({
    app,
    path: '/adminconsoleql',
    subscriptionsPath: '/adminconsoleql'
  });

  const userConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, userConsoleModule]
  })
  const userConsoleSchema = userConsoleApp.createSchemaForApollo();
  const userQlServer = new ApolloServer({
    schema: userConsoleSchema,
    context: contextFn,
    subscriptions: {
      path: '/subscriptions',
    },
    // playground: false,
    uploads: {
      maxFileSize: 10000000,
      maxFiles: 20
    },
  });
  await userQlServer.start();
  userQlServer.applyMiddleware({
    app,
    path: '/userconsoleql'
  });

  const webappConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, webappModule]
  })
  const webAppSchema = webappConsoleApp.createSchemaForApollo();
  const webappQlServer = new ApolloServer({
    schema: webAppSchema,
    context: contextFn,
    subscriptions: {
      path: '/subscriptions',
    },
    // playground: false,
    uploads: {
      maxFileSize: 10000000,
      maxFiles: 20
    },
  });
  await webappQlServer.start();
  webappQlServer.applyMiddleware({
    app,
    path: '/webappql'
  });
};
