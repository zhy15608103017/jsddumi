// dir
// /src/app.js
import authTools from '@jusda/auth-tools';

export const dva = {
    config: {
        onError(err) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};

const { AuthLogin, AuthApplication } = authTools;


export async function render(oldRender) {
    // 统一认证鉴权
    await AuthLogin();
    // 跨应用鉴权
    await AuthApplication();
    oldRender();
}
