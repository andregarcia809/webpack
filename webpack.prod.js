const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge"); //Allows access the webpack.commom config file
const HtmlWebpackPlugin = require("html-webpack-plugin"); //generates a copy of the source HTLM
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contentHash].bundle.js", //hashed filename where all the js is compiled
    path: path.resolve(__dirname, "dist") // dirictory where files are parse
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        //Minify HTML
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].[hash].css" }), //Creates css/ dir and hashes css files (.css) 
    new CleanWebpackPlugin() //Removes old generated bundles form dist
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        // 1.sass-loader: Turns sass into css 2.css-loader: Turns css into js 3.MiniCssExtractPlugin-loader: Extract css into dist/css
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", //save asset and hash it
              outputPath: "images" //creates images dir and copy to dist
            }
          },
          {
            loader: "image-webpack-loader", //Handles image Compression
            options: {
              mozjpeg: {
                progressive: true,
                quality: 60
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
});
