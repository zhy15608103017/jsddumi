# 文档
权限组件库, 提供权限判断, 获取权限列表, 权限组件功能

## api
* AuthorizedWrap

    * 函数简述
        权限判断高阶组件, 有权限则返回组件, 无权限, 则为 null


    * 函数详细介绍

         组件 props 参数 和返回值

        - param {string} authCode 权限码
        - param {React.ReactNode}  Children
        - return { React.ReactNode } Children | null

* getAuthList

    * 函数简述
        获取权限列表

    * 函数详述

        - return { object[] } 权限列表

* authorized

    * 函数简述
        权限判断, 有权限为 true

特殊说明，比如特殊情况下会报错等
