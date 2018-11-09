import { INotificationSettings } from '@/models/INotificationSettings';
import Axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<INotificationSettings, undefined> = {
    async notifications(context) {
        try {
            const n = Axios.get<INotificationSettings>(
                process.env.VUE_APP_API_URI + 'me/notification-settings',
            {withCredentials: true});
            context.commit('SetNotifications', n);
        } catch (e) {
            /*if (e.response.status === 401) {
                history.push("/");
            } else {
                this.props.showErrorMessage(e.response.status);
            }*/
        }
    }
};
