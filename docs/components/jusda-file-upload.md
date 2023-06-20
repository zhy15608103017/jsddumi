---
title: jusda-file-upload 文件上传
nav: 组件
toc: content
group: 
  title: JS-SDK
  order: 1
---
# jusda-file-upload

## 背景

文件上传

## Example

> 注: 该上传文件为真实上传(cp-manager),切勿暴力测试，测试结果查看控制台和接口调用情况

<code transform="true" src="../../demo/jusda-file-upload/index.tsx"></code>

## 使用方法

```bash
$ npm install --save @jusda-tools/jusda-file-upload --registry http://nexus.jusda.int/verdaccio/


# 新文件上传下载服务sdk
/*  未使用@jusda-tools/web-api-client， umi-request使用put上传文件，接口400
*
*  bucketName: 容器名
*  objectName: 路径地址
*  file: 文件对象
*  md5：通过文件对象经过spark-md5返回的文件md5
* */

1.内部调用
npm i @jusda-tools/jusda-file-upload

    (window as any).jusdaBaseConfig.clientId && JScookies.get('Jusda_token') 根据两个值判断是否内部调用

    const ex = new InitUpload();

2.外部调用
accessKeyId：系统管理员在录入信息后，会基于相应信息，给开发者提供对应的clientId和clientSecret
accessKeySecret：系统管理员在录入信息后，会基于相应信息，给开发者提供对应的clientId和clientSecret
bucketName: 上传文件的桶名
region: 域名地址

    import { InitUpload } from '@jusda-tools/jusda-file-upload';

    const ex = new InitUpload({ accessKeyId: 'sharpApp', accessKeySecret: '4lhoOg7lxpRyGsXoJJHWOGnXPyqF38AH', bucketName: 'sharp-app',  region: 'https://mpdev.jus-link.com/' });

使用案列
    // file: any, ("文件对象")
    // bucketName: string (“向管理员申请到的桶名,以产品划分”)
    // objectName: string (“完整路径（例如test/aa.txt）objectName完整路径中不能包含Bucket名称,不能已”/“开头。一般以功能作为目录划分例如: import/user/user.xsl”;)
    // fileId: string || number (“上传文件生成的文件id”)

    ex.initFileUploadFn(file,  'sharp-app', file?.name).then((res: any) => {
        console.log(res);
        ...
    }).catch((err: any) => {
        message.warning('服务器错误，请稍后重试');
    });

    ex.initFileDownloadFn(fileId).then((res: any) => {
        console.log(res);
    });
    
    // 返回一个永久不变的file访问url
    ex.getImmutableFileUrlFn(fileId).then((res: any) => {
        console.log(res);
    });

