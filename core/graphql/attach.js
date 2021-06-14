require('graphql-import-node');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const { ObjectId } = require('mongodb');
const { createApplication, createModule } = require('graphql-modules');
const { graphqlHTTP } = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');
const rootSchema = require('./schema.graphql');
const resolvers = require('./resolvers');
const DbError = require('@react-ssrex/database/DbError');
const UsersDb = require('@react-ssrex/database/UsersDb');

const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');


module.exports = async function attach({ app, mongoClient, mongoDatabase, UsersDb }) {
  const contextFn = (c) => ({
    ...c,
    mongoClient,
    mongoDatabase,
    UsersDb,
    generateId: (idStr) => new ObjectId(idStr),
  });

  const rootModule = createModule({
    id: 'root',
    typeDefs: rootSchema,
    resolvers,
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

  const authApp = await createApplication({
    modules: [rootModule, i18nModule, authModule]
  })

  const authSchema = authApp.createSchemaForApollo();
  const authQlServer = new ApolloServer({
    schema: authSchema,
    context: contextFn,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  });
  await authQlServer.start();
  authQlServer.applyMiddleware({app, path: '/authql'});

  const adminConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, adminConsoleModule]
  })
  const adminConsoleSchema = await adminConsoleApp.createSchemaForApollo();

  const adminQLServer = new ApolloServer({
    schema: adminConsoleSchema,
    context: contextFn,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  });
  await adminQLServer.start();
  adminQLServer.applyMiddleware({app, path: '/adminconsoleql'});

  const userConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, userConsoleModule]
  })
  const userConsoleSchema = userConsoleApp.createSchemaForApollo();
  const userQlServer = new ApolloServer({
    schema: userConsoleSchema,
    context: contextFn,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  });
  await userQlServer.start();
  userQlServer.applyMiddleware({app, path: '/userconsoleql'});

  const webappConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, webappModule]
  })
  const webAppSchema = webappConsoleApp.createSchemaForApollo();
  const webappQlServer = new ApolloServer({
    schema: webAppSchema,
    context: contextFn,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  });
  await webappQlServer.start();
  webappQlServer.applyMiddleware({app, path: '/webappql'});
};
