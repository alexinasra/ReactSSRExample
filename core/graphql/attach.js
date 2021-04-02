require('graphql-import-node');
const { createApplication, createModule } = require('graphql-modules');
const { graphqlHTTP } = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');
const rootSchema = require('./schema.graphql');
const resolvers = require('./resolvers');


const restrictToAdmin = (req, res, next) => next();
const restrictToUser = (req, res, next) => {
  if (!req.user) {
    res.status(401);
  }

  return next();
};

module.exports = async function attach({ app }) {
  const rootModule = createModule({
    id: 'root',
    typeDefs: rootSchema,
    resolvers,
  });

  const i18nModule = createModule({
    id: 'i18n',
    typeDefs: require('@foodle/i18n/graphql/schema.graphql'),
    resolvers: require('@foodle/i18n/graphql/resolvers'),
  });
  const authModule = createModule({
    id: 'auth',
    typeDefs: require('@foodle/auth/graphql/schema.graphql'),
    resolvers: require('@foodle/auth/graphql/resolvers'),
  });
  const adminConsoleModule = createModule({
    id: 'adminconsole',
    typeDefs: require('@foodle/adminconsole/graphql/schema.graphql'),
    resolvers: require('@foodle/adminconsole/graphql/resolvers'),
  });
  const userConsoleModule = createModule({
    id: 'userconsole',
    typeDefs: require('@foodle/userconsole/graphql/schema.graphql'),
    resolvers: require('@foodle/userconsole/graphql/resolvers'),
  });
  const restaurantConsoleModule = createModule({
    id: 'restaurantconsole',
    typeDefs: require('@foodle/restaurantconsole/graphql/schema.graphql'),
    resolvers: require('@foodle/restaurantconsole/graphql/resolvers'),
  });
  const webappModule = createModule({
    id: 'webapp',
    typeDefs: require('@foodle/webapp/graphql/schema.graphql'),
    resolvers: require('@foodle/webapp/graphql/resolvers'),
  });


  const authApp = await createApplication({
    modules: [rootModule, i18nModule, authModule]
  })

  const authSchema = authApp.createSchemaForApollo();
  (new ApolloServer({
    schema: authSchema,
    context: (c) => c,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  })).applyMiddleware({app, path: '/authql'});

  const adminConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, adminConsoleModule]
  })
  const adminConsoleSchema = await adminConsoleApp.createSchemaForApollo();
  (new ApolloServer({
    schema: adminConsoleSchema,
    context: (c) => c,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  })).applyMiddleware({app, path: '/adminconsoleql'});

  const userConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, userConsoleModule]
  })
  const userConsoleSchema = userConsoleApp.createSchemaForApollo();
  (new ApolloServer({
    schema: userConsoleSchema,
    context: (c) => c,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  })).applyMiddleware({app, path: '/userconsoleql'});

  const restaurantConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, restaurantConsoleModule]
  })
  const restaurantConsoleSchema = await restaurantConsoleApp.createSchemaForApollo();
  (new ApolloServer({
    schema: restaurantConsoleSchema,
    context: (c) => c,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  })).applyMiddleware({app, path: '/restaurantconsoleql'});

  const webappConsoleApp = await createApplication({
    modules: [rootModule, i18nModule, authModule, webappModule]
  })
  const webAppSchema = webappConsoleApp.createSchemaForApollo();
  (new ApolloServer({
    schema: webAppSchema,
    context: (c) => c,
    uploads: { maxFileSize: 10000000, maxFiles: 20 },
  })).applyMiddleware({app, path: '/webappql'});
};
