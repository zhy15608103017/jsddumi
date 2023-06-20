// rollup.config.js
// ES output
var common = require('./rollup.js');
var commonjs = require('rollup-plugin-commonjs');

module.exports = {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.esm.js',
        format: 'es',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
    },
    plugins: [
        commonjs(),
        common.getCompiler()
    ]
};
