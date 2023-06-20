const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'jusda-im.js',
        library: 'jusda',
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
                            '@ant-prefix': 'imant',
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
                test: /\.(png|jpg|ico|gif)$/i,
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
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
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM'
        }
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
            filename: 'jusda.css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        })
    ]
};
