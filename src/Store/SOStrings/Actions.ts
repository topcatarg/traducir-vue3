import ISOString from '@/models/ISOString';
import QueryViewModel from '@/models/QueryViewModel';
import Axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<ISOString[], undefined> = {
  FillSOStrings(context, param: QueryViewModel) {
    Axios.post<ISOString[]>(process.env.VUE_APP_API_URI + 'strings/query',
      param, { withCredentials: true })
      .then(response => {
        context.commit('SetState', response.data);
        // context.commit('SetHasError', false);
      });
  },
};
