import ISOString from '@/models/ISOString';
import { MutationTree } from 'vuex';
import { IState, state } from './State';

export const mutations: MutationTree<IState> = {
    SetState(s: IState, newstate: ISOString[]) {
        s.ISOString = Object.assign(s.ISOString, newstate);
        s.HasData = s.ISOString.length > 0;
    },
    Reset(s: IState, newstate: ISOString[]) {
        s.ISOString = [];
        s.HasData = s.ISOString.length > 0;
    },
    StringToEdit(s: IState, newstate: ISOString) {
        if (s.StringToEdit === undefined) {
            s.StringToEdit = Object.assign({}, newstate);
        } else {
            s.StringToEdit = Object.assign(s.StringToEdit, newstate);
        }
    }
};
