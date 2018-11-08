import IuserInfo from '@/models/UserInfo';
import Axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<IuserInfo, undefined> = {
    me(context) {
        Axios.post<IuserInfo>(process.env.VUE_APP_API_URI + 'me', {}, { withCredentials: true })
        // Axios.post<IuserInfo>('app/me', {}, { withCredentials: true })
          .then(data => {
            context.commit('SetState', data.data);
          })
          .catch(error => context.commit('SetState', undefined));
      }
};
