const path = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpackbar = require('webpackbar');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')()],
                        },
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            modifyVars: {
                                '@ant-prefix': 'jusda-address',
                                'primary-color': '#ffc500',
                            },
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['css-loader'],
            },
            // {
            //     test: /\.(bmp|png|jpg|jpeg|ico|gif)$/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 limit: 1024 * 10, // 文件小于10kb，输出DataUrl
            //                 outputPath: "images", // 该路径相对于html输出路径
            //                 publicPath: "../../images",
            //                 name: "[name].[ext]",
            //             },
            //         },
            //     ],
            // },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'jusda-address.css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new Webpackbar(),
    ],
};
