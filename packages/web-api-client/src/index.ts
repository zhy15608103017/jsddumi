import request, { extend } from 'umi-request';
import { CookieTools } from '@jusda-tools/jusda-publicmethod';

const cookieTools = new CookieTools();

function addFieldsForAuthentication() {
  let authFields = {};
  const token = cookieTools.getToken() || '';
  //@ts-ignore
  const { clientId='' } =  window.jusdaBaseConfig || {};

  if (token) {
    authFields = {
      authorization: `Bearer ${token}`,
      clientId,
    }
  }
  return authFields;
}

request.use(async (ctx, next) => {
  ctx.req.options = {
    ...ctx.req.options,
    headers: {
      ...addFieldsForAuthentication(),
      ...ctx.req.options.headers
    }
  };
  return next();
}, { global: true });

export default request;
export {
  extend,
};
