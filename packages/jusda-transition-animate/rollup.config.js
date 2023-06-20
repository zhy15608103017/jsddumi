/* eslint-disable linebreak-style */
// rollup.config.js

import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint'; // eslint插件
import ts from 'rollup-plugin-typescript2';
// import less from 'rollup-plugin-less';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const getPath = (_path) => path.resolve(__dirname, _path);

const extensions = ['.js', '.ts', '.tsx'];
// eslint
const esPlugin = eslint({
    throwOnError: true,
    include: ['src/**/*.ts','src/**/*.tsx'],
    exclude: [/^(.+\/)?node_modules\/.+$/, 'lib/**'],
});

const ENV = process.env.NODE_ENV;

// ts
const tsPlugin = ts({
    tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
    extensions,
});

export default [
    {
    // 核心选项
        input: 'src/index.tsx', // 必须

        output: {
            file: 'dist/index.js',
            formate: 'cjs',
            name: 'transitionAnimate',
        },

        plugins: [
            replace({
                ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
            resolve(extensions),
            babel({
                exclude: /^(.+\/)?node_modules\/.+$/,
            }),
            commonjs({
                include: /^(.+\/)?node_modules\/.+$/,
                namedExports: {
                    'node_modules/react/index.js': [
                        'isValidElement',
                        'Children',
                        'cloneElement',
                    ],
                },
            }),
            esPlugin,
            tsPlugin,
            postcss(),
            terser({ compress: { drop_console: true } }),
        ],
    },
];1;
