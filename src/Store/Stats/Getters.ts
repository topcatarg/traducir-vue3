import IStats from '@/models/Stats';
import { userTypeToString } from '@/models/UserType';
import { GetterTree } from 'vuex';
import { state } from './State';

export const getters: GetterTree<IStats, undefined> = {
    GetState(): IStats {
        return state;
    },
    GetTotalStrings(): number {
        return state.totalStrings;
    },
    GetUrgentStrings(): number {
        return state.urgentStrings;
    },
    GetWaitingApproval(): number {
        return state.waitingApproval;
    },
    GetWithoutTranslation(): number {
        return state.withoutTranslation;
    },
    GetWaitingReview(): number {
        return state.waitingReview;
    }
};
