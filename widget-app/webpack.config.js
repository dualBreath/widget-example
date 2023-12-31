const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/api.ts",
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "exchange-widget-bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        dependency: { not: ['url'] },
      }
    ]
  }
};