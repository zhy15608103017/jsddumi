const { nodeResolve } = require('@rollup/plugin-node-resolve'); // 必写!! 让rollup能够定位node_modules里面的依赖
const commonjs = require('@rollup/plugin-commonjs'); // 必写!! 让rollup能够解析commonjs格式的包
const typescript = require('rollup-plugin-typescript2');
const json = require('@rollup/plugin-json');

const path = require('path');
const root = process.cwd();
const inputOptions = {
    // 写你自己的入口文件
    input: 'src/index.ts',
    // 写自己要排除的依赖
    external: [
        'react',
        'react-dom',
        'antd',
        '@jusda-tools/url-config',
        'react-svg',
        'momo-user-control-panel',
        '@jusda-tools/user-control-panel',
        '@jusda-tools/web-api-client',
        '@jusda-tools/local-permission',
    ],
    // 自己的插件
    plugins: [
        json(),
        nodeResolve(), // 必写!! 让rollup能够定位node_modules里面的依赖
        commonjs(), // 必写!! 让rollup能够解析commonjs格式的包
        // ts文件转换
        typescript({
            tsconfig: path.resolve(root, 'tsconfig.json'),
            rollupCommonJSResolveHack: false,
            clean: true,
            useTsconfigDeclarationDir: true,
        }),
    ],
};

const outputOptions = {
    file: 'dist/index.js', // 输出文件
    format: 'cjs', // 输出文件类型
    exports: 'named', // 具体解释 https://www.rollupjs.com/guide/big-list-of-options#exports
    sourcemap: true,  // 输出map文件
    plugins: [],  // 输出时要用到的插件 一般不填
};

export default {
    ...inputOptions,
    output: outputOptions,
};
