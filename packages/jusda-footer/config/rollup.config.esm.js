// rollup.config.js
// ES output
var common = require('./rollup.js');

const postcss = require('rollup-plugin-postcss');

module.exports = {
    input: 'src/index.jsx',
    output: {
        file: 'dist/index.esm.js',
        format: 'es',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
    },
    plugins: [
        postcss(),
        common.getCompiler()
    ]
};
