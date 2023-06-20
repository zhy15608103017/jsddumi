// rollup.config.js
// ES output
var postcss = require('rollup-plugin-postcss');
var common = require('./rollup.js');

module.exports = {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.esm.js',
        format: 'es',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
    },
    external: [
        'react',
    ],
    plugins: [
        postcss(),
        common.getCompiler()
    ]
};
