#!/usr/bin/env node

var asar = require('../src/start.js');
var commander = require('commander');
const program = new commander.Command()

program.version('v' + require('../package.json').version)
    .description('Manipulate asar archive files')

program.command('pack <dir> <output>')
    .alias('p')
    .description('create asar archive')
    .action(function (__dirpath, output) {
        asar.geAsar(__dirpath, output);
        console.log(output + "文件成功生成");
    })
program.command('check')
    .alias('p')
    .description('检查包版本....')

program.parse(process.argv)

if (program.args.length === 0) {
    program.help();
};