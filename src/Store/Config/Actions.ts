import IConfig from '@/models/Config';
import Axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<IConfig, undefined> = {
    config(context) {
        Axios.get<IConfig>(process.env.VUE_APP_API_URI + 'config')
        // Axios.get<IConfig>('/app/api/config')
          .then(response => {
              context.commit('SetConfig', response.data);
            })
          .catch(error => context.commit('SetConfig', undefined));
      }
};
