const path = require("path");

module.exports = {
  entry: {
      main: "./src/assets/js/index.js", //file where the app starts
      vendor: './src/assets/js/vendor.js' //file where the vendors starts
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"] // require image assets
      },
    ]
  },
};
