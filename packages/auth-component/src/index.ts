import AuthorizedWrap, { authorized } from './Auth';
import getAuthList from './getAuthList';
import AuthClass from './AuthClass';
import { isPrivatization, IsPrivatizationWrap } from './privatization';

const initPermissions = getAuthList;

export default {
    AuthClass,
    AuthorizedWrap,
    getAuthList,
    authorized,
    initPermissions,
    isPrivatization,
    IsPrivatizationWrap,
};
