// rollup.config.js
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs"
const typescript = require('rollup-plugin-typescript2');
import { babel } from "@rollup/plugin-babel";
const postcss = require('rollup-plugin-postcss');
const rollPostcssConfig = require("./postcss.config.js");
const extensions = ['.js', '.ts', '.tsx'];
const path = require('path');
const root = process.cwd();

export default {
    input: 'src/index.ts',
    output: {
        // file: 'dist/index.js',
        // format: 'cjs',
        file: 'dist/index.js', // 输出文件
        format: "cjs", // 输出文件类型
        exports: "named", // 具体解释 https://www.rollupjs.com/guide/big-list-of-options#exports
        sourcemap: true,  // 输出map文件
        plugins: [],  // 输出时要用到的插件 一般不填
    },
    external: [
        'antd',
    ],
    plugins: [
        nodeResolve(), 
        json(), 
        postcss(rollPostcssConfig),
        commonjs(),
        // ts文件转换
        typescript({
            tsconfig: path.resolve(root, 'tsconfig.json'),
            rollupCommonJSResolveHack: false,
            clean: true,
            useTsconfigDeclarationDir: true,
        }),
        babel({
            babelHelpers: 'runtime',
            exclude: /^(.+\/)?node_modules\/.+$/,
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            skipPreflightCheck: true
        }),
    ],
};
