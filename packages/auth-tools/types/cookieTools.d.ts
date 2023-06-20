export interface setProps {
    key: string;
    value: any;
    configuration: any,
}
declare class CookieTools {
    get: (key: string) => string | undefined;
    set: ({ key, value, configuration }: setProps) => Promise<setProps>;
    remove: (key: string) => void;
    getToken: () => string | undefined;
    removeToken: () => void;
}
export default CookieTools;
