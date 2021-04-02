const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  name: 'server',
  mode: 'development',
  // devtool: "source-map",
  target: 'node',
  entry: path.resolve(__dirname, './src/serverRenderer.js'),
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },

  resolve: {
    extensions: ['.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$/,
        exclude: /node_modules/,
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          emitFile: false,
          publicPath: '/assets/',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [

    new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // new HtmlWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        external: ['path', 'react', 'react-dom', 'react-router', 'react-router-dom', '@material-ui', '@foodle/ui'],
      },
    }),
  ],
};
