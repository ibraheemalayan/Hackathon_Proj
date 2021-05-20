// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
      profile: path.join(__dirname, '..', 'dev_static', 'js', 'profile.jsx'),
      stock_page: path.join(__dirname, '..', 'dev_static', 'js', 'stock_page.jsx'),
  },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.jsx', '.js'],
      modules: [path.resolve(__dirname, '..','node_modules'), 'node_modules']
    },
    output: {
      path: path.join(__dirname, '..', 'static', 'js'),
      filename: '[name].min.js'
    },
};