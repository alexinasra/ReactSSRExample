
module.exports = {
  presets: ["@babel/preset-react", ["@babel/preset-env", {
      "useBuiltIns": false,
    }]],
  ignore: ["node_modules"],
  plugins: [
    "import-graphql",
    [
      "file-loader",
      {
        name: "[name].[ext]",
        outputPath: "/assets",
        publicPath: "/assets/",
      },
    ],
    "@babel/plugin-proposal-class-properties"
  ],
  env: {
    production: {
      plugins: [
        "@babel/plugin-transform-async-to-generator",
        ["@babel/plugin-transform-runtime", {
            "corejs": 2,
            useESModules: false,
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
