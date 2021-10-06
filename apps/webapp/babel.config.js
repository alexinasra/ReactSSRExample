const path = require('path');

module.exports = {
  presets: [["@babel/preset-env", {
      "useBuiltIns": false,
    }],
    "@babel/preset-react"],
  ignore: ["node_modules"],
  plugins: [
    "import-graphql",
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
      plugins: [
        "transform-async-to-module-method",
        ["@babel/plugin-transform-runtime", {
            "corejs": 2
        }]
      ],
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
