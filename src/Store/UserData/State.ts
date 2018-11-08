import IuserInfo from '@/models/UserInfo';
import { UserType } from '@/models/UserType';

export const state: IuserInfo = {
    name : '',
    userType : UserType.User,
    canSuggest : false,
    canReview : false,
    canManageUsers : false,
    id : 0
};
