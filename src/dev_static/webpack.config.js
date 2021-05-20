const path = require('path');

const node_mods_path = path.resolve('C:', 'ws', 'House_of_investments', 'src', 'webpack_ws', 'node_modules')

module.exports = {
    mode: 'development',
    entry: {
        profile: path.join(__dirname, '..', 'dev_static', 'js', 'profile.jsx'),
        stock_page: path.join(__dirname, '..', 'dev_static', 'js', 'stock_page.jsx'),
        admin_user_profile: path.join(__dirname, '..', 'dev_static', 'js', 'admin_user_profile.jsx'),
        admin_stock_page: path.join(__dirname, '..', 'dev_static', 'js', 'admin_stock_page.jsx'),
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.jsx', '.js'],
      modules: [node_mods_path, 'node_modules']
    },
    output: {
      path: path.join(__dirname, '..', 'dev_static', 'js'),
      filename: '[name].js'
    },
    };
    