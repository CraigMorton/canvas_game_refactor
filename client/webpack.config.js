config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: "./build"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx", ".ts"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query:{
          presets: ['es2015', "stage-2"]
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}
module.exports = config;