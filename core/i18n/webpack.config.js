const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  entry: [
    path.join(__dirname, './src/client.js')],
  output: {
    path: __dirname,
    filename: 'client.js',
    publicPath: '/',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(__dirname, './babel.config.js'),
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // new HtmlWebpackPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   // test: /\.xxx$/, // may apply this only for some modules
    //   options: {
    //     external: ['react', 'react-dom', 'react-router', 'react-router-dom', '@mui', '@react-ssrex/ui'],
    //   },
    // }),
    // new webpack.HotModuleReplacementPlugin({
    //   // Options...
    // }),
    //new CleanWebpackPlugin(),
  ],
};
