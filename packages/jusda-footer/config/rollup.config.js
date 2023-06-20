// rollup.config.js
// commonjs
var common = require('./rollup.js');

const postcss = require('rollup-plugin-postcss');

module.exports = {
    input: 'src/index.jsx',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
    },
    plugins: [
        postcss(),
        common.getCompiler()
    ]
};
