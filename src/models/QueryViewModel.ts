import {IgnoredStatus} from '../Helpers/Enums/IgnoredStatus';
import {PushStatus} from '../Helpers/Enums/PushStatus';
import {SuggestionsStatus} from '../Helpers/Enums/SuggestionsStatus';
import {TranslationStatus} from '../Helpers/Enums/TranslationStatus';
import {UrgencyStatus} from '../Helpers/Enums/UrgencyStatus';

export default interface QueryViewModel {
    SourceRegex: string;
    TranslationRegex: string;
    Key: string;
    TranslationStatus: TranslationStatus;
    SuggestionsStatus: SuggestionsStatus;
    PushStatus: PushStatus;
    UrgencyStatus: UrgencyStatus;
    IgnoredStatus: IgnoredStatus;
}
