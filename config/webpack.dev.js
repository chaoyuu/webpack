const path = require("path");//nodejs核心模块
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //入口
  entry: './src/main.js',
  //输出
  output: {
    // path: path.resolve(__dirname, "../dist"),//绝对路径
    path:undefined,//给webpack-dev-server使用
    filename: "static/js/main.js",
    // clean: true,//自动清空打包内容
  },

  //加载器
  module: {
    rules: [
      //loader的配置
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],

      },

      {
        test: /\.s[ac]ss$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'sass-loader',
        ],

      },


      {
        test: /\.styl$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],

      },

      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          //image name output
          filename: 'static/images/[hash:10][ext][query]'
        },
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          //image name output
          filename: 'static/media/[hash:10][ext][query]'
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
  ],

  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot:true,//关闭HTR
  },

  //模式

  mode: "development",
  devtool: "cheap-module-source-map",


}