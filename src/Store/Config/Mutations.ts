import IConfig from '@/models/Config';
import { MutationTree } from 'vuex';
import { state } from './State';

export const mutations: MutationTree<IConfig> = {
    SetConfig(s: IConfig, newstate: IConfig) {
        Object.assign(s, newstate);
    }
};
