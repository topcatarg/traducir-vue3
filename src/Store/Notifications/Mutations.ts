import { INotificationSettings, NotificationInterval } from '@/models/INotificationSettings';
import { MutationTree } from 'vuex';
import { state } from './State';

export const mutations: MutationTree<INotificationSettings> = {
    SetNotifications(s: INotificationSettings, newstate: INotificationSettings) {
        s = Object.assign(s, newstate);
    },
    InvertUrgentStrings(s: INotificationSettings, newstate: boolean) {
        s.notifyUrgentStrings = !s.notifyUrgentStrings;
    },
    InvertSuggestionsAwaitingApproval(s: INotificationSettings, newstate: boolean) {
        s.notifySuggestionsAwaitingApproval = !s.notifySuggestionsAwaitingApproval;
    },
    InvertSuggestionsAwaitingReview(s: INotificationSettings, newstate: boolean) {
        s.notifySuggestionsAwaitingReview = !s.notifySuggestionsAwaitingReview;
    },
    InvertStringsPushedToTransifex(s: INotificationSettings, newstate: boolean) {
        s.notifyStringsPushedToTransifex = !s.notifyStringsPushedToTransifex;
    },
    InvertSuggestionsApproved(s: INotificationSettings, newstate: boolean) {
        s.notifySuggestionsApproved = !s.notifySuggestionsApproved;
    },
    InvertSuggestionsRejected(s: INotificationSettings, newstate: boolean) {
        s.notifySuggestionsRejected = !s.notifySuggestionsRejected;
    },
    InvertSuggestionsReviewed(s: INotificationSettings, newstate: boolean) {
        s.notifySuggestionsReviewed = !s.notifySuggestionsReviewed;
    },
    InvertSuggestionsOverriden(s: INotificationSettings, newstate: boolean) {
        s.notifySuggestionsOverriden = !s.notifySuggestionsOverriden;
    },
    notificationsIntervalValue(s: INotificationSettings, newstate: number) {
        s.notificationsIntervalValue = newstate;
    },
    notificationsInterval(s: INotificationSettings, newstate: NotificationInterval) {
        s.notificationsInterval = newstate;
    }
};
