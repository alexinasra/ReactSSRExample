const path = require('path');

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  ignore: ["node_modules"],
  plugins: [
    [
      "file-loader",
      {
        name: "[name].[ext]",
        outputPath: path.join(__dirname, "/build/public"),
        publicPath: "/public",
      },
    ],
    "@babel/plugin-proposal-class-properties"
  ],
  env: {
    production: {
      ignore: ["packages/*"],
    },
    development: {
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            useESModules: false,
          },
        ],
      ],
    },
  },
};
