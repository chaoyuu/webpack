module.exports = {
    presets: [

        ['@babel/preset-env',

            {
                useBuiltIns: 'usage',//自动引入
                corejs:3,
            }

        ]

    ],//编译ES6

}