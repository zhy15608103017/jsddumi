/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function formatRoutes(
    list: any[],
    name?: string | any[] | undefined,
): Array<any> {
    const newList = list.reduce(
        (initialValue: any, item: { routes: any; name: any }) => {
            if (item.routes) {
                const obj = name ? { parentName: name } : {};
                return [
                    ...initialValue,
                    {
                        ...item,
                        ...obj,
                        routes: formatRoutes(
                            item.routes,
                            name ? name.concat(`-${item.name}`) : item.name,
                        ),
                    },
                ];
            }
            const obj = name ? { parentName: name } : {};
            return [...initialValue, { ...item, ...obj }];
        },
        [],
    );
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

const getWindowPath = () => {
    const { hash } = window.location;
    let windowPath: any = '';
    if (hash) {
        windowPath = hash.replace('#', '').split('?')?.[0]?.split('/') || [];
    } else {
        windowPath = window.location.pathname.split('?')?.[0]?.split('/') || [];
    }

    return windowPath;
};

export function getNavSelect(routes = []) {
    const { hash, pathname } = window.location;
    if (pathname || hash) {
        const flatDoneRoutes = flatRoutes(routes);

        const windowPath = getWindowPath();
        const selectedInfo = flatDoneRoutes.find((item: any) => {
            const businessSystemPath =
        item?.pathKey?.split('/') || item?.path?.split('/') || [];

            const matchResult = windowPath?.every(
                (ele: any, index: number) =>
                    ele === businessSystemPath[index] ||
          businessSystemPath[index]?.indexOf(':') >= 0,
            );
            return matchResult;
        });

        return {
            defaultOpenKeys: selectedInfo?.parentName
                ? selectedInfo.parentName.split('-')
                : [],
            defaultSelectedKeys: selectedInfo?.name
                ? [selectedInfo.pathKey || selectedInfo.path]
                : [],
        } as any;
    }

    return {
        defaultOpenKeys: [],
        defaultSelectedKeys: [],
    } as any;
}
