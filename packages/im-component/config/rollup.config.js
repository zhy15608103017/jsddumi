// rollup.config.js
// commonjs
var common = require('./rollup.js');
var postcss = require('rollup-plugin-postcss');

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: require.resolve('url-loader'),
                options: {
                    name: 'dist/[name].[ext]',
                    limit: 8192
                }
            },
        ],
    },
    plugins: [
        postcss({
            extensions: ['.css', '.scss', '.less'],
            use: [
                ['less', {
                    javascriptEnabled: true,
                    modifyVars: {
                        '@ant-prefix': 'imant',
                    },
                }]
            ],
            namedExports(name) {
                // Maybe you simply want to convert dash to underscore
                return name.replace('.*ant.*', 'imant');
            }
        }),
        common.getCompiler()
    ]
};
