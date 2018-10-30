import ISOString from '@/models/ISOString';
import { MutationTree } from 'vuex';
import { state } from './State';

export const mutations: MutationTree<ISOString[]> = {
    SetState(s: ISOString[], newstate: ISOString[]) {
        s = newstate;
    }
};