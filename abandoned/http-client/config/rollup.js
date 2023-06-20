var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner = 
`/*!
 * ${pkg.name} ${version} (https://github.com/yazohu/jusda-tools-http-client)
 * API https://github.com/yazohu/jusda-tools-http-client/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} yazohu. All Rights Reserved
 * Licensed under MIT (https://github.com/yazohu/jusda-tools-http-client/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    }

    return typescript(opt);
}

exports.name = 'jusda-tools-http-client';
exports.banner = banner;
exports.getCompiler = getCompiler;
