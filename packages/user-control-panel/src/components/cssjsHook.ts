// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable */
import React, { useState } from 'react';
import { theme } from 'antd';
import { useStyleRegister } from '@ant-design/cssinjs';
// import useStyle from '../styles/index';

// function cssjsHook(compontTheme: string ,component: any): any {
// 	return () => {
// 		const {theme, token, hashId} = useToken();
// 		const prefixCls = 'juslink';
// 		// 全局注册，内部会做缓存优化
// 		const wrapSSR = useStyleRegister(
// 			{
// 				theme, token, hashId, path: [prefixCls],
// 			},
// 			() => [useStyle(prefixCls, compontTheme)],
// 		);
// 		return wrapSSR(component(hashId))
// 	};
// }

const withHooksHOC = (Component: any) => {
    return () => {
        const { useToken } = theme;
		console.log('1212==>', useToken())
      	return Component(useToken());
    };
  };

export{ 
	// cssjsHook, 
	withHooksHOC };
