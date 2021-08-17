const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {


    entry : './src/app.js',
    output:{
        path : path.resolve(__dirname , 'dist'),
        filename: "bundle.js"
    },
    mode: "none",
    plugins: [
        new MiniCssExtractPlugin({filename :'./style/style.css'}),
        new HtmlWebpackPlugin(
            {
              title:'Todo List',
              filename : 'index.html',
              template : './index.html',
            })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
  };
  


module.exports = config;