import IStats from '@/models/Stats';
import Axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<IStats, undefined> = {
      stats(context) {
        Axios.get<IStats>(process.env.VUE_APP_API_URI + 'strings/stats')
          .then(response => context.commit('SetState', response.data))
          .catch(error => context.commit('SetState', undefined));
      }
};
