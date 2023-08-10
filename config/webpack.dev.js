const path = require("path");//nodejs核心模块
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //入口
  entry: './src/main.js',
  //输出
  output: {
    // path: path.resolve(__dirname, "../dist"),//绝对路径
    path:undefined,//给webpack-dev-server使用
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    //图片，字体通过type
    assetModuleFilename:"static/media/[hash:10][ext][query]",
    // clean: true,//自动清空打包内容
  
  },

  //加载器
  module: {
    rules: [
       {
        oneOf:[
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
       
          'style-loader',
          'css-loader',
          'sass-loader',
        ],

      },


      {
        test: /\.styl$/,
        use: [

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
        // generator: {
        //   //image name output
        //   filename: 'static/images/[hash:10][ext][query]'
        // },
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        // generator: {
        //   //image name output
        //   filename: 'static/media/[hash:10][ext][query]'
        // },
      },
      {
        test: /\.js$/,
        // exclude: /node_modules/,//排除node_modules目录
          include: path.resolve(__dirname,'../src'),//只处理src的文件
          use: [
            {
            loader: 'thread-loader',//开启多进程
            options:{
              works:threads,
            }
            },
            {
              loader: 'babel-loader',
              options: {
                // presets: ['@babel/preset-env'],
                cacheDirectory: true,//开启babel缓存
                cacheCompression: false,//关闭缓存文件压缩
                plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
              }
            }

          ]
        

      },
        ]
       },
    ],
  },
  //插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude:"node_modules",
      cache: true,
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
      threads,//开启多进程

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