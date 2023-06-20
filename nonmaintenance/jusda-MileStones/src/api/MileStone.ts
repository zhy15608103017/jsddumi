import { mpApiUrl } from '@jusda-tools/url-config';
import request from '../utils/request';
export const getShipmentsOwner = async (sign: string, transportMode: string) => {
    return await request.get(
        `${mpApiUrl}/juslink-sccp-milestone/tenants/me/groups/${sign}_${transportMode}/milestones`,
    );
};
