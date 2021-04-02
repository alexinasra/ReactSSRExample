
module.exports = {
  presets: ["@babel/preset-env"],
  ignore: ["node_modules"],
  plugins: [
    [
      "file-loader",
      {
        name: "[name].[ext]",
        outputPath: "/",
      },
    ],
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
