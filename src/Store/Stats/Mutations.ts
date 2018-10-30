import IStats from '@/models/Stats';
import { MutationTree } from 'vuex';

export const mutations: MutationTree<IStats> = {
    SetState(s: IStats, newstate: IStats) {
        Object.assign(s, newstate);
    }
};
