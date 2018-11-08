import IConfig from '@/models/Config';
import { GetterTree } from 'vuex';
import { state } from './State';

export const getters: GetterTree<IConfig, undefined> = {
    GetState(): IConfig {
        return state;
    },
    siteDomain(): string {
        return state.siteDomain;
    },
    friendlyName(): string {
        return state.friendlyName;
    },
    transifexPath(): string {
        return state.transifexPath;
    }
};
