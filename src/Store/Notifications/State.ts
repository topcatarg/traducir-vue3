import { INotificationSettings, NotificationInterval } from '@/models/INotificationSettings';

export const state: INotificationSettings = {
    notifyUrgentStrings: false,
    notifySuggestionsAwaitingApproval: false,
    notifySuggestionsAwaitingReview: false,
    notifyStringsPushedToTransifex: false,
    notifySuggestionsApproved: false,
    notifySuggestionsRejected: false,
    notifySuggestionsReviewed: false,
    notifySuggestionsOverriden: false,
    notificationsInterval: NotificationInterval.Minutes,
    notificationsIntervalValue: 0
};
