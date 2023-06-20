// rollup.config.js
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser'; //压缩代码
const extensions = ['.js', '.ts', '.tsx'];

export default {
    input: 'src/index.ts',
    output: {
        file: './dist/index.js',
        format: 'cjs',
    },
    plugins: [
        json(),
        resolve(extensions),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        terser({ compress: { drop_console: true } }),
    ],
};
