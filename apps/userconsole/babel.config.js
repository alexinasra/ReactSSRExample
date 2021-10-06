
module.exports = {
  presets: [["@babel/preset-env", {
      "useBuiltIns": false,
    }],
    "@babel/preset-react"],
  ignore: ["node_modules"],
  plugins: [
    "file-loader",
    [
      "import-graphql",
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
