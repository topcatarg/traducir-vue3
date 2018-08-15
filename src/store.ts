import Axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import IConfig from './models/Config';
import IStats from './models/Stats';
import IuserInfo from './models/UserInfo';

Vue.use(Vuex);

export interface State {
  Config?: IConfig|undefined;
  userData?: IuserInfo;
  stats?: IStats;
}

export const OriginalState: State = {
  Config: undefined
};

export default new Vuex.Store({
  state: OriginalState,
  mutations: {
    SetUser(state, newstate: IuserInfo) {
      state.userData = newstate;
    },
    SetConfig(state, newstate: IConfig) {
      state.Config = newstate;
    },
    SetStats(state, newstate: IStats) {
      state.stats = newstate;
    }
  },
  actions: {
    me(context) {
      Axios.post<IuserInfo>(process.env.VUE_APP_BASE_URI + 'me', { }, {withCredentials: true})
      .then(data => {
        context.commit('SetUser', data.data);
      })
      .catch(error => context.commit('SetUser', undefined));
    },
    config(context) {
      Axios.get<IConfig>(process.env.VUE_APP_BASE_URI + 'config')
      .then(response => context.commit('SetConfig', response.data))
      .catch(error => context.commit('SetConfig', undefined));
    },
    stats(context) {
      Axios.get<IStats>(process.env.VUE_APP_BASE_URI + 'strings/stats')
            .then(response => context.commit('SetStats', response.data))
            .catch(error => context.commit('SetStats', undefined));
    }
  }
});
