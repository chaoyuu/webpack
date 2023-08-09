const path = require("path");//nodejs核心模块
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 用来获取处理样式的loader
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader, // 提取css成单独文件
    "css-loader", // 将css资源编译成commonjs的模块到js中
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean);
}
module.exports = {
  //入口
  entry: './src/main.js',
  //输出
  output: {
    path: path.resolve(__dirname, "../dist"),//绝对路径
    filename: "static/js/main.js",
    clean: true,//自动清空打包内容
  },

  //加载器
  module: {
    rules: [
      //loader的配置
      {
        test: /\.css$/,
        use: getStyleLoader(),

      },
      {
        test: /\.less$/,
        use: getStyleLoader('less-loader'),


      },

      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader('sass-loader'),

      },


      {
        test: /\.styl$/,
        use: getStyleLoader('stylus-loader'),

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
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    new CssMinimizerPlugin(),

  ],
  //模式

  mode: "production",
  devtool: "source-map",


}