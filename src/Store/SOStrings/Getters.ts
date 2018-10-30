import ISOString from '@/models/ISOString';
import { GetterTree } from 'vuex';
import { state } from './State';

export const getters: GetterTree<IuserInfo, undefined> = {
    GetState(): IuserInfo {
        return state;
    },
    GetUserName(): string {
        return state !== undefined ? state.name : '';
    },
    GetUserLogedin(): boolean {
      return state.id !== 0;
    },
    GetUserType(): string {
        return userTypeToString(state.userType);
    }
};
