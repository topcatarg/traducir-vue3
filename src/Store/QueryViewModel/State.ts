import QueryViewModel from '@/models/QueryViewModel';

export const state: QueryViewModel = {
    SourceRegex: '',
    TranslationRegex: '',
    Key: '',
    TranslationStatus: 0,
    SuggestionsStatus: 0,
    PushStatus: 0,
    UrgencyStatus: 0,
    IgnoredStatus: 0
};
