import IuserInfo from '@/models/UserInfo';
import { MutationTree } from 'vuex';
import { state } from './State';

export const mutations: MutationTree<IuserInfo> = {
    SetState(s: IuserInfo, newstate: IuserInfo) {
        Object.assign(s, newstate);
    }
};
