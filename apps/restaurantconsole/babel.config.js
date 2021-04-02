
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
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
