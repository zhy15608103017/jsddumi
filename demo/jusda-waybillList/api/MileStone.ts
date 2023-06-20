import { mpApiUrl } from '@jusda-tools/url-config';
import request from '../utils/request'
export const getShipmentsOwner = async (
    route: string,
    transportMode: string,
  ) => {
    return await request.get(
      `${mpApiUrl}/juslink-sccp-milestone/tenants/me/groups/${route}:${transportMode}/milestones`
      );
    };