const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/main.js",
  output: {
    filename: "./[name].bundle.js",
    path: path.resolve(__dirname, "./")
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "js")]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
