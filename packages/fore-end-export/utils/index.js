export default function workerize(code, options) {
    let exports = {};
    let exportsObjName = `__xpo${Math.random().toString().substring(2)}__`;
    if (typeof code==='function') code = `(${Function.prototype.toString.call(code)})(${exportsObjName})`;
    code = toCjs(code, exportsObjName, exports) + `\n(${Function.prototype.toString.call(setup)})(self,${exportsObjName},{})`;
    let url = URL.createObjectURL(new Blob([code],{ type: 'text/javascript' })),
        worker = new Worker(url, options),
        term = worker.terminate,
        callbacks = {},
        counter = 0,
        i;
    worker.kill = signal => {
        worker.postMessage({ type: 'KILL', signal });
        setTimeout(worker.terminate);
    };
    worker.terminate = () => {
        URL.revokeObjectURL(url);
        term.call(worker);
    };
    worker.call = (method, params) => new Promise( (resolve, reject) => {
        let id = `rpc${++counter}`;
        callbacks[id] = [resolve, reject];
        worker.postMessage({ type: 'RPC', id, method, params });
    });
    worker.rpcMethods = {};
    setup(worker, worker.rpcMethods, callbacks);
    worker.expose = methodName => {
        worker[methodName] = function() {
            return worker.call(methodName, [].slice.call(arguments));
        };
    };
    for (i in exports) if (!(i in worker)) worker.expose(i);
    return worker;
}

function setup(ctx, rpcMethods, callbacks) {
    ctx.addEventListener('message', ({ data }) => {
        let id = data.id;
        if (data.type!=='RPC' || id==null) return;
        if (data.method) {
            let method = rpcMethods[data.method];
            if (method==null) {
                ctx.postMessage({ type: 'RPC', id, error: 'NO_SUCH_METHOD' });
            }
            else {
                Promise.resolve()
                    .then( () => method.apply(null, data.params) )
                    .then( result => { ctx.postMessage({ type: 'RPC', id, result }); })
                    .catch( err => { ctx.postMessage({ type: 'RPC', id, error: ''+err }); });
            }
        }
        else {
            let callback = callbacks[id];
            if (callback==null) throw Error(`Unknown callback ${id}`);
            delete callbacks[id];
            if (data.error) callback[1](Error(data.error));
            else callback[0](data.result);
        }
    });
}

function toCjs(code, exportsObjName, exports) {
    code = code.replace(/^(\s*)export\s+default\s+/m, (s, before) => {
        exports.default = true;
        return `${before}${exportsObjName}.default=`;
    });
    code = code.replace(/^(\s*)export\s+((?:async\s*)?function(?:\s*\*)?|const|let|var)(\s+)([a-zA-Z$_][a-zA-Z0-9$_]*)/mg, (s, before, type, ws, name) => {
        exports[name] = true;
        return `${before}${exportsObjName}.${name}=${type}${ws}${name}`;
    });
    return `var ${exportsObjName}={};\n${code}\n${exportsObjName};`;
}
export function workerFn(e){
    
    // const weakMap = new WeakMap();
    // const symHeaders = Symbol('headers');
    // const symwidth = Symbol('width');
    // weakMap[symHeaders]=[]
    // weakMap[symwidth]=[]
    // columns.forEach((i)=>{
    //     weakMap[symHeaders].push(i?.title||"")
    //     weakMap[symwidth].push({ wpx: i?.width||100 })
    // })
    // function removeKeysNotInArray(obj, arr) {
    //     for (let key in obj) {
    //       if (!arr.includes(key)) {
    //         delete obj[key];
    //       }
    //     }
    //   }
    // data=data.map((i)=>{
    //      return removeKeysNotInArray(i, weakMap[symHeaders])
    // })
    // // eslint-disable-next-line no-undef
    // const workbook = XLSX.utils.book_new();
    // const worksheet = XLSX.utils.json_to_sheet(evt.data.data);
    // worksheet['!cols'] =weakMap[symwidth]
    // XLSX.utils.sheet_add_aoa(worksheet, [weakMap[symHeaders]], { origin: "A1" });
    // XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1');

    return workbook;
}
export function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
export function isFunction(value) {
    return getType(value)==='function'?true:false;
}
export function deepClone(obj) {
    //判断传进来的参数类型不是对象数组 或者是null时 直接返回
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }
    //定义返回值result
    // 判断传进来的数据类型 是数组/对象 就给result一个数组/对象
    let result = Array.isArray(obj) ? [] : {};
    //循环遍历方便拷贝
    for (let key in obj) {
        //判读自有属性
        if (obj?.hasOwnProperty(key)) {
        //函数递归实现深层拷贝
            result[key] = deepClone(obj[key]);
        }
    }
    //返回出去
    return result;}
  


