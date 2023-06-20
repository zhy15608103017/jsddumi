const path = require("path");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const Webpackbar = require("webpackbar");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "index.js",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
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
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            modifyVars: {
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
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    esModule: false,
                    limit: 20000,
                    name: "static/media/[name].[hash:8].[ext]",
                },
                exclude:/\.svg$/,
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    },
    externals: {
        react: "react",
        "react-dom": "react-dom",
    },
    plugins: [new FriendlyErrorsWebpackPlugin(), new Webpackbar()],
};
