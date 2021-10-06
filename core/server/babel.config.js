
module.exports = {
  presets: ["@babel/preset-react", ["@babel/preset-env", {
      "useBuiltIns": false,
      "targets": {
          "node": "current"
        }
    }]],
  exclude: [/node_modules/],
  plugins: [
    "@babel/plugin-transform-runtime",
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    // '@babel/plugin-transform-runtime',
    // // for IE 11 support
    // '@babel/plugin-transform-object-assign',

    "import-graphql",
    [
      "file-loader",
      {
        "name": "[name].[ext]",
        "outputPath": "/assets",
        "publicPath": "/assets/"}
    ],
    "@babel/plugin-proposal-class-properties"
  ],
  env: {

    production: {
      ignore: [
        "packages/*"
      ]
    },
    development: {
      plugins: [
        ['@babel/plugin-transform-runtime', {
          "useESModules": false,
        }],
      ],
    }
  }
}
