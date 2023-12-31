var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner = 
`/*!
 * ${pkg.name} ${version} (https://github.com/wfc/jusda-tools-web-api-client)
 * API https://github.com/wfc/jusda-tools-web-api-client/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} wfc. All Rights Reserved
 * Licensed under MIT (https://github.com/wfc/jusda-tools-web-api-client/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    }

    return typescript(opt);
}

exports.name = 'jusda-tools-web-api-client';
exports.banner = banner;
exports.getCompiler = getCompiler;
