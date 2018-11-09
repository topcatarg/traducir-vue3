import { INotificationSettings } from '@/models/INotificationSettings';
import { MutationTree } from 'vuex';
import { state } from './State';

export const mutations: MutationTree<INotificationSettings> = {
    SetNotifications(s: INotificationSettings, newstate: INotificationSettings) {
        Object.assign(s, newstate);
    }
};
