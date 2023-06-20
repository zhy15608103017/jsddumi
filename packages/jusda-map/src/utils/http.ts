import request from '@jusda-tools/web-api-client';
import { mpApiUrl } from '@jusda-tools/url-config';
//@ts-ignore
import { currentLanguage } from '@jusda-tools/jusda-publicMethod';
// 请求节点数据

request.interceptors.request.use((url:any, options: any) => {
  const { headers } = options;
  return {
      options: {
          ...options,
          headers: { ...headers, 'accept-language': currentLanguage(),'Cache-Control':'no-store'  },
      },
  };
});
export const getShipmentsOwner = async (
  route: string,
  transportMode: string,
) => {
  return await request.get(
    `${mpApiUrl}/juslink-sccp-milestone/tenants/me/groups/${route}:${transportMode}/milestones`
    );
  };

