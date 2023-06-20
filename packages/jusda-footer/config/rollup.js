var babel = require('rollup-plugin-babel');


var pkg = require('../package.json');

var version = pkg.version;

var banner =
    `/*!
 * ${pkg.name} ${version} (https://github.com/yazohu/jusda-footer)
 * API https://github.com/yazohu/jusda-footer/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} yazohu. All Rights Reserved
 * Licensed under MIT (https://github.com/yazohu/jusda-footer/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    return babel({
        babelrc: false,
        presets: [
            [
                '@babel/preset-env',
                {
                    'targets': {
                        'browsers': 'last 2 versions, > 1%, ie >= 6, Android >= 4, iOS >= 6, and_uc > 9',
                        'node': '0.10'
                    },
                    'modules': false,
                    'loose': false
                }
            ],
            [
                '@babel/preset-react'
            ]
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    'helpers': false,
                    'regenerator': false
                }
            ]
        ],
        runtimeHelpers: true,
        exclude: 'node_modules/**'
    });
}

exports.name = 'jusda-footer';
exports.banner = banner;
exports.getCompiler = getCompiler;
