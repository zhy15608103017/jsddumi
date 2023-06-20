var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner = 
`/*!
 * ${pkg.name} ${version} (https://github.com/wangym/language-control-panel)
 * API https://github.com/wangym/language-control-panel/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} wangym. All Rights Reserved
 * Licensed under MIT (https://github.com/wangym/language-control-panel/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    }

    return typescript(opt);
}

exports.name = 'language-control-panel';
exports.banner = banner;
exports.getCompiler = getCompiler;
