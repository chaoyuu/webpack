const path  = require("path");//nodejs核心模块
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports ={
    //入口
      entry:'./src/main.js',
    //输出
    output:{
        path: path.resolve(__dirname, "dist"),//绝对路径
        filename:"static/js/main.js",
        clean: true,//自动清空打包内容
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
          }
        ],
    },
    plugins: [
      new ESLintPlugin({
         context: path.resolve(__dirname, "src"),
      }),
    ],

    //模式

    mode: "development",


}