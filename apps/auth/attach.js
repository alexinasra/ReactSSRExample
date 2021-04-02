
const fs = require('fs');
const path = require('path');
const express = require('express');


module.exports = async function attach({ app }) {
  const views = app.get('views') || [];
  app.set('views', [
    ...views,
    path.join(__dirname, './views')
  ]);

  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackConf0 = require('./webpack.node');
    const webpackConf1 = require('./webpack.config');

    const webpackCompiler = webpack([webpackConf0, webpackConf1]);
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

    const md = webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConf1.output.publicPath,
      index: false,
      serverSideRender: true,
      //writeToDisk: true,
    });
    await md.waitUntilValid();
    app.use(md);

    app.use(require('webpack-hot-middleware')(
      webpackCompiler.compilers.find(compiler => compiler.name === 'client'), {
        publicPath: webpackConf0.output.publicPath,
        path: "/auth_hmr"
    }));
    app.use('/auth', webpackHotServerMiddleware(webpackCompiler));

  } else {

    const webpack = require('webpack');
    const webpackConf0 = require('./webpack.node.production');
    const webpackConf1 = require('./webpack.config.production');

    const webpackCompiler = webpack([webpackConf0, webpackConf1], () => {
      const serverRenderer = require('./build/server');
      app.use('/auth', express.static(path.join(__dirname, 'build', 'public')));
      app.use('/auth', serverRenderer({}));

    });
  }
}
