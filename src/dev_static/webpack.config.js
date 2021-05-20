const path = require('path');

const node_mods_path = path.resolve('C:', 'ws', 'Hackathon_proj', 'src', 'dev_static', 'node_modules')

module.exports = {
    mode: 'development',
    entry: {
        map: path.join(__dirname, '..', 'dev_static', 'js', 'map.jsx'),
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
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
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
    