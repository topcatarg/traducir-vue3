import ISOString from '@/models/ISOString';
import { GetterTree } from 'vuex';
import { IState, state } from './State';

export const getters: GetterTree<IState, undefined> = {
    State(): ISOString[] {
        return state.ISOString;
    },
    HasResults(): boolean {
        return state.HasData;
    },
    StringToEdit(): ISOString|undefined {
        return state.StringToEdit;
    }
};
