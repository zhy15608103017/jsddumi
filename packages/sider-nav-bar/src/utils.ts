/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function formatRoutes(list: any[], name?: string | any[] | undefined): Array<any> {
    const newList = list.reduce((initialValue: any, item: { routes: any; name: any }) => {
        if (item.routes) {
            const obj = name ? { parentName: name } : {};
            return [...initialValue, {
                ...item,
                ...obj,
                routes: formatRoutes(item.routes, name ? name.concat(`-${item.name}`) : item.name)
            }];
        }
        const obj = name ? { parentName: name } : {};
        return [...initialValue, { ...item, ...obj }];
    }, []);
    return newList;
}

function flatRoutes(routes: any) {
    return routes.reduce((arr: any, item: { routes: any }) => {
        if (item.routes) {
            return arr.concat([item], flatRoutes(item.routes));
        }
        return arr.concat([item]);
    }, []);
}

export function getNavSelect(routes = []) {
    const { hash } = window.location;
    if (hash) {
        const [path] = hash.replace('#', '').split('?');
        const flatDoneRoutes = flatRoutes(routes);
        const selectInfo = flatDoneRoutes.find((item: any) => item.path === path);
        return {
            defaultOpenKeys: selectInfo?.parentName ? selectInfo.parentName.split('-') : [],
            defaultSelectedKeys: selectInfo?.name ? [selectInfo.name] : [],
        } as any;
    }
    return {
        defaultOpenKeys: [],
        defaultSelectedKeys: []
    } as any;
}

