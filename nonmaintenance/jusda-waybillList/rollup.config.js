/* eslint-disable linebreak-style */
// rollup.config.js

import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import commonjs from '@rollup/plugin-commonjs';
// import babel from 'rollup-plugin-babel';
import babel from '@rollup/plugin-babel';

// import { eslint } from 'rollup-plugin-eslint'; // eslint插件
import ts from 'rollup-plugin-typescript2';
// import less from 'rollup-plugin-less';
// import replace from 'rollup-plugin-replace';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser'; //
import postcss from 'rollup-plugin-postcss'; // 编译less、sass
import json from 'rollup-plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
const getPath = (_path) => path.resolve(__dirname, _path);

const extensions = ['.js', '.ts', '.tsx'];
// eslint
// const esPlugin = eslint({
//     throwOnError: true,
//     include: ['src/**/*.ts','src/**/*.tsx'],
//     exclude: ['node_modules/**', 'lib/**'],
// });

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
    external: ['react', 'react-dom'], //不用自己项目的react
    output: {
      file: 'dist/index.js',
      formate: 'cjs',
      name: 'transitionAnimate',
    },

    plugins: [
      json(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      nodePolyfills(),
      resolve(extensions),
      commonjs({
        // include: 'node_modules/**',
        // 若编译或构建时依赖包导出报错，则根据报错路径添加导出至namedExports中
        namedExports: {
          'node_modules/react/index.js': [
            'isValidElement',
            'Children',
            'cloneElement',
            'createContext',
          ],
          'node_modules/rc-util/node_modules/react-is/index.js': [
            'isFragment',
            'isMemo',
          ],
          '../../node_modules/@babel/runtime/helpers/typeof.js': ['default'],
          '../../node_modules/_react-dom@17.0.2@react-dom/index.js': [
            'default',
          ],
          'node_modules/_react-is@17.0.2@react-is/index.js': [
            'isFragment',
            'isMemo',
          ],
          'node_modules/_react@17.0.2@react/index.js': [
            'createContext',
            'useLayoutEffect',
            'useEffect',
            'useRef',
            'Component',
            'useContext',
            'useContext',
            'forwardRef',
            'useImperativeHandle',
            'useState',
            'useMemo',
            'useCallback',
            'cloneElement',
            'isValidElement',
          ],
          // 'node_modules/react-is/index.js': ['isFragment', 'isMemo'],
          'node_modules/@jusda-tools/url-config/dist/index.js': ['mpApiUrl'],
        },
      }),
      // esPlugin,
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      tsPlugin,
      postcss(),
      terser({ compress: { drop_console: true } }),
    ],
  },
];
1;
