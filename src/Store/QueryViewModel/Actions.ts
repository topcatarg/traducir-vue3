import { IgnoredStatus } from '@/Helpers/Enums/IgnoredStatus';
import { PushStatus } from '@/Helpers/Enums/PushStatus';
import { SuggestionsStatus } from '@/Helpers/Enums/SuggestionsStatus';
import { TranslationStatus } from '@/Helpers/Enums/TranslationStatus';
import { UrgencyStatus } from '@/Helpers/Enums/UrgencyStatus';
import QueryViewModel from '@/models/QueryViewModel';
import Axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<QueryViewModel, undefined> = {
    reset(context) {
        const v: QueryViewModel = {
            SourceRegex: '',
            TranslationRegex: '',
            Key: '',
            TranslationStatus: TranslationStatus['Any String'],
            SuggestionsStatus: SuggestionsStatus['Any string'],
            PushStatus: PushStatus.AnyStatus,
            UrgencyStatus: UrgencyStatus['Any string'],
            IgnoredStatus: IgnoredStatus.AvoidIgnored
        }
        context.commit('State', v);
    }
};
