import IConfig from '@/models/Config';
import { MutationTree } from 'vuex';
import { state } from './State';

export const mutations: MutationTree<IConfig> = {
    State(s: IConfig, newstate: IConfig) {
        s = Object.assign({}, newstate);
    }
};
