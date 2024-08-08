/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/button-has-type */

import foreendexport from '@jusda-tools/fore-end-export';
import React from 'react';
const App = () => {
    const y = 100;
    const x = 20;

    const keys = new Array(x).fill(0).map((_e, i) => {
        return ['名字' + i, '胡彦斌' + i + Date.now()];
    });
    const data = new Array(y).fill(Object.fromEntries(keys));
    const columns = new Array(x).fill(0).map((_e, i) => {
        return {
            title: '名字' + i,
            width: 100,
            key: '名字' + i,
        };
    });

    return (
        <button
            onClick={() => {
                foreendexport({
                    data,
                    columns,
                    widthAuto:true,
                    flieName:'导出文件.xlsx',
                    lifecycleConfig:{
                        create: () => {
                            console.log(111);
                        },
                    },
                    animationConfig:{
                        dataProcessing: true,
                        filing: true,
                        filiPromptText: '文件生成中',
                    },}
                );
            }}
        >
      导出文件
        </button>
    );
};
export default App;
