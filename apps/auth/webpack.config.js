const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  name: 'client',
  mode: 'development',
  devtool: "eval-source-map",
  target: 'web',
  entry: {
    main: [
      path.join(__dirname, './src/main.js'),
      'webpack-hot-middleware/client?path=/auth_hmr',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build', 'public'),
    filename: '[name].js',
    publicPath: '/auth',
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {

        reactDom: {
          name: 'react-dom',
          test:  /[\\/]node_modules[\\/]react-dom/,
          priority: -1,
          chunks: 'all',
        },
        react: {
          name: 'react',
          test:  /[\\/]node_modules[\\/]react/,
          priority: -3,
          chunks: 'all',
        },
        materiaUI: {
          name: 'material-ui',
          test:  module => module.identifier().includes('/@mui/'),
          priority: -5,
          chunks: 'all',
        },
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          priority: -19,
          minChunks: 2,
        },
        default: {
          name: 'main',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // new HtmlWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        external: ['react', 'react-dom', 'react-router', 'react-router-dom', '@mui', '@react-ssrex/ui'],
      },
    }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    //new CleanWebpackPlugin(),
  ],
};
