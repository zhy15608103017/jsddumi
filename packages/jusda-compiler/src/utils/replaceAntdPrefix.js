import process from 'process';
export default class ReplaceAntdPrefixPlugin {
    constructor() { }
    apply(compiler) {
        compiler.hooks.beforeCompile.tapAsync(
            'replace-prefix-plugin',
            (_, callback) => {
                callback();
            },
        );
        compiler.hooks.emit.tapAsync(
            'replace-prefix-plugin',
            (compilation, callback) => {
                Object.keys(compilation.assets).forEach((filename) => {
                    if (filename.match(/\.(css|less|js|map)$/)) {
                        let source = compilation.assets[filename].source();
                        if (typeof source === 'string') {
                            source = this.replacePrefix(source);
                        }
                        compilation.assets[filename] = {
                            source: () => source,
                            size: () => source.length,
                        };
                    }
                });
                callback();
            },
        );
    }
    replacePrefix(cssContent) {
        const packageJsonName = require(`${process.cwd()}/package.json`).name;
        cssContent = cssContent.replaceAll('.ant-', `.${packageJsonName}-`);
        cssContent = cssContent.replaceAll('--ant-', `--${packageJsonName}-`);
        return cssContent;
    }
}
