const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // The entry point file described above
  entry: './public/index.js',
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    //writeToDisk: true,
  },
  devtool: "inline-source-map",
  plugins:[
    new HTMLWebpackPlugin({
      template: './public/index.html'
    }),
    new CopyPlugin({
      patterns: [
          { from: "./public/assets", to: "assets" } //to the dist root directory
      ],
  }),
  ],
  module:{
    rules:[{
      test:/.js$/,
      exclude: /node_modules/,
      use:{
        loader: 'babel-loader',
        options:{
          presets: ['@babel/preset-env','@babel/preset-react']
        }
      }
    },
    {
      test: /\.css$/, use: [ 'style-loader', 'css-loader' ] 
    }
  ]
  }
  
};