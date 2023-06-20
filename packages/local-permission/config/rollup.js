var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner = 
`/*!
 * ${pkg.name} ${version} (https://github.com/fuchao/local-permission)
 * API https://github.com/fuchao/local-permission/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} fuchao. All Rights Reserved
 * Licensed under MIT (https://github.com/fuchao/local-permission/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    }

    return typescript(opt);
}

exports.name = 'local-permission';
exports.banner = banner;
exports.getCompiler = getCompiler;
