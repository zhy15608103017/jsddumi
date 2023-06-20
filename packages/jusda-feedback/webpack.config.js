const path = require("path");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpackbar = require("webpackbar");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.js",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
    mode:'production',
    // resolve: {
    //     // 设置别名
    //     alias: {
    //         '@': require.resolve(__dirname,'src')// 这样配置后 @ 可以指向 src 目录
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options:{
                            
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require("autoprefixer")()],
                        },
                    },
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            modifyVars: {
                                "@ant-prefix": "juslink",
                                "primary-color": "#ffc500",
                            },
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["css-loader"],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.ttf$/,/\.woff$/,/\.eot$/,/\.svg$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 100000,
                    name: "static/media/[name].[hash:8].[ext]",
                },
            },
            //  {
            //     test: /\.(bmp|png|jpg|jpeg|ico|gif)$/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 limit: true, // 文件小于10kb，输出DataUrl
            //                 outputPath: "images", // 该路径相对于html输出路径
            //                 publicPath: "./images",
            //                 name: "[name].[ext]",
            //             },
            //         },
            //     ],
            // },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'antd': 'antd',
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "jusda-feedback.css",
        //     chunkFilename: "[id].css",
        //     ignoreOrder: false,
        // }),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                output: {
                    comments: false,
                },
            },
        }),
        new Webpackbar(),
    ],
};
