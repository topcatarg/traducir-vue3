import { INotificationSettings } from '@/models/INotificationSettings';
import { GetterTree } from 'vuex';
import { state } from './State';

export const getters: GetterTree<INotificationSettings, undefined> = {
    GetState(): INotificationSettings {
        return state;
    }
};
