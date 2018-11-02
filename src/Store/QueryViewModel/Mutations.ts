import {IgnoredStatus} from '@/Helpers/Enums/IgnoredStatus';
import {PushStatus} from '@/Helpers/Enums/PushStatus';
import {SuggestionsStatus} from '@/Helpers/Enums/SuggestionsStatus';
import {TranslationStatus} from '@/Helpers/Enums/TranslationStatus';
import {UrgencyStatus} from '@/Helpers/Enums/UrgencyStatus';
import QueryViewModel from '@/models/QueryViewModel';
import { MutationTree } from 'vuex';
import { state } from './State';

export const mutations: MutationTree<QueryViewModel> = {
    SourceRegex(s: QueryViewModel, newstate: string) {
        s.SourceRegex = newstate;
    },
    TranslationRegex(s: QueryViewModel, newstate: string) {
        s.TranslationRegex = newstate;
    },
    Key(s: QueryViewModel, newstate: string) {
        s.Key = newstate;
    },
    TranslationStatus(s: QueryViewModel, newstate: TranslationStatus) {
        s.TranslationStatus = newstate;
    },
    SuggestionsStatus(s: QueryViewModel, newstate: SuggestionsStatus) {
        s.SuggestionsStatus = newstate;
    },
    PushStatus(s: QueryViewModel, newstate: PushStatus) {
        s.PushStatus = newstate;
    },
    UrgencyStatus(s: QueryViewModel, newstate: UrgencyStatus) {
        s.UrgencyStatus = newstate;
    },
    IgnoredStatus(s: QueryViewModel, newstate: IgnoredStatus) {
        s.IgnoredStatus = newstate;
    },
    State(s: QueryViewModel, newstate: QueryViewModel) {
        Object.assign(s, newstate);
    }
};
