const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
    mode: 'production',
    entry: './src/index.jsx',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'index',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.(t|j)sx?$/,
            //     include: /src/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader'
            // },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         // 'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         {
            //             loader: 'less-loader', // compiles Less to CSS
            //             options: {
            //                 // modifyVars: {
            //                 //     '@ant-prefix': 'imant',
            //                 // },
            //                 javascriptEnabled: true,
            //             },
            //         }
            //     ],
            // },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, 
                {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            '@ant-prefix': 'juslink',
                        },
                        javascriptEnabled: true,
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    name: './static/[name].[hash:8].[ext]',
                    esModule: false
                },
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: Object.assign(
            {
                'jusda-ui': path.join(__dirname, './components')
            }
        )
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom', 
        'antd': 'antd',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }),
        new webpack.BannerPlugin(`${pkg.name} v${pkg.version}
            Copyright 2019-present, Jusda, Inc.
            All rights reserved.`),
        new MiniCssExtractPlugin({
            filename: 'index.css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        })
    ]
};
