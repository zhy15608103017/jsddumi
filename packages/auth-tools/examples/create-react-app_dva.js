// dir
// src/index.js
import authTools from '@jusda/auth-tools';

const { AuthLogin, AuthApplication } = authTools;
// 1. Initialize
// ...
// 2. Plugins
// ...
// 3. Model
// ...
// 4. Router
// ...

async function bootstrap() {
    // 统一认证鉴权
    await AuthLogin();
    // 跨应用鉴权
    await AuthApplication();
    app.start('#root');
}
// 5. Start
bootstrap();
