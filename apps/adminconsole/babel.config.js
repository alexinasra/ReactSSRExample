
module.exports = {
  presets: [["@babel/preset-env", {
      "useBuiltIns": false,
    }],
    "@babel/preset-react"],
  ignore: ["node_modules"],
  plugins: [
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
            useESModules: false,
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
