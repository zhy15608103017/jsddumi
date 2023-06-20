// rollup.config.js
// ES output
var postcss = require('rollup-plugin-postcss');
var common = require('./rollup.js');

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.esm.js',
        format: 'es',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
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
