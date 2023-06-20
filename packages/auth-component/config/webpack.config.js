const path = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const Webpackbar = require('webpackbar');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
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
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            '@ant-prefix': 'rc',
                            'primary-color': '#ffc500',
                        },
                        javascriptEnabled: true,
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ],
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
        new Webpackbar(),
        new MiniCssExtractPlugin({
            filename: "jusda-file-upload.css",
            chunkFilename: "[id].css",
            ignoreOrder: false,
        }),
    ],
};
