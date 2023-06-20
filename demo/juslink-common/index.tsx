/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable semi */
/* eslint-disable no-empty */
import React, { ReactElement,useState } from 'react';
// import { ReactComponent as IconParkDown } from './iconPark-check-small.svg'
import {DownSelection}  from '@jusda-tools/juslink-common';
interface Parameter {
    page: number;
    value?: string;
}

export default function Index(): ReactElement {
    
    let arr: any[]=[]
    for(let i = 0;i<=100;i++) {
        arr.push({
            name:'测试菜单' + i,
            code:'code' + i
        })
    }   
    const [data,setData]=useState<any[]>([]);
    const [total,setTotal]=useState<number>();
    const [defaultData,setdefaultData]=useState({
        name:'测试菜单',
        code:'code'
    });


    const getdata=(parms: Parameter): Promise<any>=>{
        return  new Promise(function(resolve, reject){
            setTimeout(function () {
                resolve({
                    data: arr.splice((parms.page)*10,10),
                    total: arr.length/10
                }); // 代码正常执行！
            // reject('失败')
            }, 250);
        })
    }
    const downSelectionFn=async (item: Parameter): Promise<void> =>{
        let res= await getdata(item)
        setData(res.data)
        setTotal(res.total)
    }; 
    const itemClick=(item: any): void=>{
        setdefaultData(item);
   
    }
    return (
        <div>
            <DownSelection 
                name={'name'}
                code={'code'}
                data={data}
                total={total}
                lable={'当前租户'}
                itemClick={itemClick}
                IconMap={
                    {
                        // downIcon:IconParkDown  as  React.ForwardRefExoticComponent<any>
                    }
                }
                TriggerFunction={downSelectionFn}
                // 返回按钮提示值
                goBackTip={'返回租户列表'}
                defaultData={ defaultData}/>
          
        </div>
    );
}
