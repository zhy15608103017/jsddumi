import { IApi } from '@umijs/types';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export default function (api: IApi): void {
    api.onGenerateFiles((): void => { // 在webpack编译之前来生成临时文件
        let umiVersion = 3;
        if (api.pkg.dependencies) {
            umiVersion = +((api.pkg.dependencies['umi'] || api.pkg.dependencies['@umijs/max']).replace(/\^|~/g, '')).split('.')[0];
        }
        const path = api.env === 'production' ? './src/.umi-production/umi.ts' : './src/.umi/umi.ts'; // 通过当前运行的环境来判断umi的配置文件路径
        const buffer = readFileSync(resolve(path)); // 获取到文件内容
        const c = String(buffer); // 将Buffer类的数据转为string，方便写入到临时文件中
        api.writeTmpFile({ // 写一个bootstrap的临时文件
            path: umiVersion >= 4 ? '../bootstrap.ts' : 'bootstrap.ts',
            content: c, // 内容即是刚才转为string的buffer
        });
        api.writeTmpFile({ // 修改umi.ts文件内容为引入bootstrap文件，此写法为webapck推荐的异步边界写法
            path: umiVersion >= 4 ? '../umi.ts' : 'umi.ts',
            content: 'import("./bootstrap")',
        });
    });
}