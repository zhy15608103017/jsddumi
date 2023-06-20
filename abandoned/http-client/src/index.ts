import { Context } from 'umi-request';
import request from './request';

async function getToken(code, url) {
  let result = await request.get(`${url}?code=${code}`);
  return result;
}

const getTokenDefault = () => {
  return undefined;
};

const getClientIdDefault = () => {
  return undefined;
};

const setConfig = function() {
  let tokenCb = undefined;
  let clientIdCb = undefined;

  return {
    setTokenCb: cb => {
      tokenCb = cb;
    },
    getToken: () => {
      if (typeof tokenCb === 'string') {
        return tokenCb;
      }
      if (typeof tokenCb === 'undefined') {
        tokenCb = getTokenDefault;
      }
      return tokenCb();
    },
    setClientCb: cb => {
      clientIdCb = cb;
    },
    getClientId: () => {
      if (typeof clientIdCb === 'string') {
        return clientIdCb;
      }
      if (typeof clientIdCb === 'undefined') {
        clientIdCb = getClientIdDefault;
      }

      return clientIdCb();
    }
  };
};

const config = setConfig();

export { getToken, config };

const getAuthorization = () => {
  let token = config.getToken();
  if (token && token !== 'undefined' && token !== 'none' && token !== 'null' && token.indexOf('Bearer ') !== 0) {
    return `Bearer ${token}`;
  }
  return token;
}

// @ts-ignore
request.use(async (ctx: Context, next: () => void) => {
  const headers: Record<string, any> = {
    clientId: config.getClientId(),
  }
  const token = getAuthorization();
  if (token) {
    headers.authorization = token
  }
  // console.log('ctx ==> ', ctx);
  // console.log('headers ==> ', headers)
  Object.defineProperty(ctx, 'req', {
    value: {
      ...ctx.req,
      options: {
        ...ctx.req.options,
        headers: {
          ...headers,
          ...ctx.req.options.headers
        }
      }
    }
  });
  // console.log('ctx ==> ', ctx);

  return next();
});

export default request;
