const path = require('path');
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
    })
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