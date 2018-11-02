import ISOString from '@/models/ISOString';
import { GetterTree } from 'vuex';
import { state } from './State';

export const getters: GetterTree<ISOString[], undefined> = {
    GetState(): ISOString[] {
        return state;
    },
    GetHasResults(): boolean {
        return state.length > 0;
    }
};
