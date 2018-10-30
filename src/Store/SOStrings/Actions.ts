import ISOString from '@/models/ISOString';
import QueryViewModel from '@/models/QueryViewModel';
import Axios from 'axios';
import { ActionTree } from 'vuex';

export const actions: ActionTree<ISOString[], undefined> = {
  SetQueryViewModel(context, param: QueryViewModel) {
    // context.commit('SetQueryViewModel', param);
    Axios.post<ISOString[]>(process.env.VUE_APP_API_URI + 'strings/query',
      param, { withCredentials: true })
      .then(response => {
        context.commit('SetSOStrings', response.data);
        context.commit('SetHasError', false);
      });
  },
};
