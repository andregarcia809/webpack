const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //generates an HTML file for app

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "js/[name].js", // filename where all the js is compiled
    path: path.resolve(__dirname, "dist") // dirictory where files are parse
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"] // 1.sass-loader: Turns sass into css 2.css-loader: Turns css into js 3.style-loader: Injects css into DOM
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]", //save asset and hash it
            outputPath: "images" //copy to new folder
          }
        }
      }
    ]
  }
});
