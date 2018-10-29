import {IgnoredStatus} from '@/Helpers/Enums/IgnoredStatus';
import {PushStatus} from '@/Helpers/Enums/PushStatus';
import {SuggestionsStatus} from '@/Helpers/Enums/SuggestionsStatus';
import {TranslationStatus} from '@/Helpers/Enums/TranslationStatus';
import {UrgencyStatus} from '@/Helpers/Enums/UrgencyStatus';
import QueryViewModel from '@/models/QueryViewModel';
import { GetterTree } from 'vuex';
import { state } from './State';

export const getters: GetterTree<QueryViewModel, undefined> = {
    SourceRegex(): string {
        return state.SourceRegex;
    },
    TranslationRegex(): string {
        return state.TranslationRegex;
    },
    Key(): string {
        return state.Key;
    },
    TranslationStatus(): TranslationStatus {
        return state.TranslationStatus;
    },
    SuggestionsStatus(): SuggestionsStatus {
        return state.SuggestionsStatus;
    },
    PushStatus(): PushStatus {
        return state.PushStatus;
    },
    UrgencyStatus(): UrgencyStatus {
        return state.UrgencyStatus;
    },
    IgnoredStatus(): IgnoredStatus {
        return state.IgnoredStatus;
    },
    GetState(): QueryViewModel {
        return state;
    }
};
