// rollup.config.js
// umd
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var postcss = require('rollup-plugin-postcss');


var common = require('./rollup.js');

var prod = process.env.NODE_ENV === 'production';

module.exports = {
    input: 'src/index.js',
    output: {
        file: prod ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
        format: 'umd',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        name: common.name,
        banner: common.banner,
    },
    plugins: [
        nodeResolve({
            main: true,
            extensions: ['.js']
        }),
        postcss({
            extensions: ['.css', '.scss', '.less'],
            use: [
                ['less', {
                    javascriptEnabled: true,
                    // modifyVars: {
                    //     '@ant-prefix': 'imant',
                    // },
                }]
            ],
            namedExports(name) {
                // Maybe you simply want to convert dash to underscore
                return name.replace(/ant/g, 'imaaaa');
            }
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        common.getCompiler(),
        (prod && uglify())
    ]
};
